import readExcel from "../../helpers/readExcel.js"
import { getCityCode, getHotelsByCity } from "../../services/amadeusService.js"
import City from "../models/cities.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "../sequelize.js";
import { Op, where } from "sequelize";
import Hotel from "../models/hotel.js";

async function clearCityTable() {
  try {
    const deletedCount = await City.destroy({ where: {}});
    await sequelize.query('ALTER SEQUENCE cities_id_seq RESTART WITH 1;');
    console.log(`Deleted ${deletedCount} rows from city table.`);
  } catch (err) {
    console.error("Error deleting cities:", err);
  }
}

// clearCityTable();


async function updateCitiesTable() {
  try {
    await City.sync({ alter: true }); 
    console.log('Cities table updated with new fields!');
  } catch (err) {
    console.error(err);
  }
}

// updateCitiesTable();


export default async function migrateCities() {
    try {
        if(await City.count() > 0) {
            console.log("Cities already migrated.");
            return ;
        }
        const citiesJson = readExcel("../external/cities.xlsx")     //Read cities name from excel file and store in DB

        const cityNames = citiesJson.map(c => {
            return { name: String(c.city || "").trim(), stateAbbreviation: String(c.state_id || "").trim() }
        })
 
        await City.bulkCreate(cityNames) 
        console.log("Cities inserted successfully!");
        limit: 100
    } catch(e) {
        console.log(e)
    }
}

// migrateCities();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export async function importCityNameAndCityCodeToJson(number) {     
 
    try {
        
        const citiesFromDB = await City.findAll({
            attributes: ["name"],
            where: { isFetched: false },                     // Read city names from DB get city codes from Amadeus API and store in JSON file
            limit: number
        });
      
        console.log("Found", citiesFromDB.length, "cities in the database  alooo.");
        const cities = [];
        for (const city of citiesFromDB) {
            const sanitizedName = city.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            await delay(2000);
            console.log("Processing city:", city.name);
            const cityCode = await getCityCode(sanitizedName);
   
        if (cityCode) {
            cities.push({ name: city.name, code: cityCode });
        }
    }
      const filePath =   makeJsonFile("cities", cities);
        console.log(cities.length);
        console.log("Cities JSON file created at:", filePath);
}catch(err){
    console.error("Error importing city names and codes:", err.message);
}
    }

// importCityNameAndCityCodeToJson(500)

export async function makeJsonFile(filename, data){
  try{
      const currentFilePath = fileURLToPath(import.meta.url);
      const externalDir = path.resolve(path.dirname(currentFilePath), "../external");    //Create JSON file in external folder
      fs.mkdirSync(externalDir, { recursive: true });
       const now = new Date();
       const dateStr = now.toISOString().split("T")[0]; 
       const finalFilename = `${filename}_${dateStr}.json`;

      const filePath = path.join(externalDir, finalFilename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

      console.log(`${filename} file created at:`, filePath);
      return filePath;
    }catch(err){  
  console.error("Error creating JSON file:", err.message);
        }

}



export async function importHotelToJsonFromAPI(JsonFile) {
    const hotels = [];

    try {
        const cityFromJson = JSON.parse(
            fs.readFileSync(path.resolve("src/db/external", JsonFile), "utf-8")
        );

        for (const city of cityFromJson) {
            const { code, name } = city;
            if (!code) continue; 

            const cityRecord = await City.findOne({ where: { name } });
            if (!cityRecord) {
                console.log(`City not found in DB: ${name}`);
                continue;
            }

            
            await delay(2000);
            const hotelsData = await getHotelsByCity(code);

            if (!hotelsData || hotelsData.length === 0) {
                console.log(`No hotels found for city: ${name}`);
                continue; 
            }

            hotelsData.forEach(h => {
                hotels.push({
                    // cityId: cityRecord.id,
                    state: cityRecord.stateAbbreviation,
                    name: h.name,
                    address: h.address?.lines || [],
                    latitude: h.geoCode?.latitude || null,
                    longitude: h.geoCode?.longitude || null,
                });
            });

            await cityRecord.update({ isFetched: true, cityCode: code });

            console.log(`Fetched ${hotelsData.length} hotels for city: ${name}`);
             console.log(hotels);
        }
       

        console.log("All unique hotels fetched:", hotels.length);

        makeJsonFile("hotels", hotels);

    } catch (err) {
        console.error("Error importing hotels:", err);
        makeJsonFile("hotels", hotels); 
    }
}



// importHotelToJsonFromAPI("cities_2025-08-28.json");






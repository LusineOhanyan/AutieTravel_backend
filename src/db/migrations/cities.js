import readExcel from "../../helpers/readExcel.js"
import { getCityCode, getHotelsByCity } from "../../services/amadeusService.js"
import City from "../models/cities.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "../sequelize.js";
import { Op } from "sequelize";

export default async function migrateCities() {
    try {
        if(await City.count() > 0) {
            console.log("Cities already migrated.");
            return ;
        }
        const citiesJson = readExcel("../external/cities.xlsx")     //Read cities name from excel file and store in DB

        const cityNames = citiesJson.map(c => {
            return { name: String(c.city || "").trim() }
        })
 
        await City.bulkCreate(cityNames) 
        limit: 100
    } catch(e) {
        console.log(e)
    }
}

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


        const cityCode = cityFromJson.map(c => c.code);
        const cityName = cityFromJson.map(c => c.name);
        await City.update( { isFetched: true }, { where: { name: { [Op.in]: cityName } } });
        console.log("Total cities:", cityCode.length);

        for (const code of cityCode) {
            await delay(2000); 
            const hotelsData = await getHotelsByCity(code);
            if(hotelsData.length === 0) {
                console.log(`No hotels found for city code: ${code}`);
                continue; 
            }
           
            hotelsData.forEach(h => {
              hotels.push({
                name: h.name, 
                address: h.address?.lines || [], 
                latitude: h.geoCode?.latitude || null, 
                longitude: h.geoCode?.longitude || null
            });
              
            });
            console.log("All unique hotels fetched:", hotels.length);
        }
        console.log("barev");
        makeJsonFile("hotels", hotels);
       
         
    } catch (err) {
        console.error("Error importing hotels:", err);
        makeJsonFile("hotels", hotels);
    }
}

// importHotelToJsonFromAPI("cities_2025-08-30.json");




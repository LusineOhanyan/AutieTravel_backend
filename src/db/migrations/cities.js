import readExcel from "../../helpers/readExcel.js"
import { getCityCode } from "../../services/amadeusService.js"
import City from "../models/cities.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default async function migrateCities() {
    try {
        const citiesJson = readExcel("../external/cities.xlsx")

        const cityNames = citiesJson.map(c => {
            return { name: String(c.city || "").trim() }
        })

        await City.bulkCreate(cityNames)
    } catch(e) {
        console.log(e)
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export async function importCityNameAndCityCodeToJson() {

    try {
        const citiesFromDB = await City.findAll({
    attributes: ["name"],
    limit: 100
  });


  console.log("Found", citiesFromDB.length, "cities in the database.");

  const cities = [];

  for (const city of citiesFromDB) {
    await delay(2000);
    console.log("Processing city:", city.name);
    const cityCode = await getCityCode(city.name);
    if (cityCode) {
      cities.push({ name: city.name, code: cityCode });
    }
  }
  
const currentFilePath = fileURLToPath(import.meta.url);

const externalDir = path.resolve(path.dirname(currentFilePath), "../external");

fs.mkdirSync(externalDir, { recursive: true });

const filePath = path.join(externalDir, "cities.json");

fs.writeFileSync(filePath, JSON.stringify(cities, null, 2), "utf-8");


  console.log("Cities JSON file created at:", filePath);
}catch(err){
    console.error("Error importing city names and codes:", err.message);
}
    }
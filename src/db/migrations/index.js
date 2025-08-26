import { migrateRateCategories } from "./rateCriteria.js";
import migrateCities from "./cities.js";
import { importCityNameAndCityCodeToJson } from "./cities.js";
import {migrateHotels} from "./hotels.js"

export async function runMigration() {
    try{
        await migrateRateCategories();
        await migrateCities();
        importCityNameAndCityCodeToJson()
    }catch(e){
        console.log(e.message)
    }
}
import { migrateRateCategories } from "./rateCriteria.js";
import migrateCities, { importHotelToJsonFromAPI } from "./cities.js";
import { importCityNameAndCityCodeToJson } from "./cities.js";
import {migrateHotels} from "./hotels.js"
import  insert_states_db from "./states.js";

export async function runMigration() {
    try{
        await migrateRateCategories();
        await migrateCities();
        await insert_states_db();
    }catch(e){
        console.log(e.message)
    }
}
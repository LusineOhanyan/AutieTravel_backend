import { migrateRateCategories } from "./rateCriteria.js";

export async function runMigration() {
    try{
        await migrateRateCategories();
    }catch(e){
        console.log(e.message)
    }
}
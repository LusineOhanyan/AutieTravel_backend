import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import State from "../models/states.js";
import sequelize from "../sequelize.js";

export default async function insert_states_db() {
  try {

   if(await State.count() === 52) {
        console.log("States already migrated.");
        return ;
    } 
    const __filename = fileURLToPath(import.meta.url);
    
    const externalDir = path.resolve(path.dirname(__filename), "../external");
   
    const filePath = path.join(externalDir, "states.json");
    

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    
    const statesData = data.map(item => ({ name: item.state_name, abbreviation: item.state, latitute: item.latitude, longitude: item.longitude}));
    
    console.log("STATEDATA->",statesData.length);
    
   
    await State.bulkCreate(statesData, { ignoreDuplicates: true });

    console.log(" States inserted successfully!");
  } catch (err) {
    console.error(" Error inserting states barev:", err);
  } 
}



// insert_states_db()

async function updateStateTable() {
  try {
    await State.sync({ alter: true }); 
    console.log('States table updated with new fields!');
  } catch (err) {
    console.error(err);
  }
}

// updateStateTable();




async function clearStatesTable() {
  try {
    const deletedCount = await State.destroy({ where: {} });
    console.log(`Deleted ${deletedCount} rows from states table.`);
  } catch (err) {
    console.error("Error deleting states:", err);
  }
}


// clearStatesTable();
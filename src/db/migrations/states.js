import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import State from "../models/states.js";


export default async function insert_states_db() {
  try {
   
    const __filename = fileURLToPath(import.meta.url);
    
    const externalDir = path.resolve(path.dirname(__filename), "../external");
   
    const filePath = path.join(externalDir, "states.json");
    

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    
    const statesData = data.map(item => ({ name: item.state_name }));

   
    await State.bulkCreate(statesData, { ignoreDuplicates: true });

    console.log(" States inserted successfully!");
  } catch (err) {
    console.error(" Error inserting states:", err);
  } 
}

insert_states_db();

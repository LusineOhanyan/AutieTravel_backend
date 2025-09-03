import { fstat } from "fs";
import { getCityCode, getHotelsByCity } from "../../services/amadeusService.js"
import City from "../models/cities.js"
import Hotel from "../models/hotel.js";
import fs from "fs"
import path from "path";
import sequelize from "../sequelize.js";

export async function GetCities(){
    try{
        const cities = await City.findAll({
            attributes:['name'],
            limit: 10, // Adjust the limit as needed
        })

        const cityNames = cities.map(c => c.name.trim());
        return cityNames;
    }catch(err){
        console.log("Error finding City", err);
        return [];
    }
}




export async function migrateHotels(){

    try{
        // Delete ALL records from the table
        // await Hotel.destroy({
        //     where: {},
        //     // truncate: true 
        // });
        const hotelsFromJson = JSON.parse(fs.readFileSync(path.resolve("src/db/external", "hotels_2025-09-02.json"), "utf-8")); 
         const hotelsName = hotelsFromJson.map(c => c.name);
         const hotelsAddress = hotelsFromJson.map(c => c.address);
         const lattitude = hotelsFromJson.map(c => c.latitude);
         const longitude = hotelsFromJson.map(c => c.longitude);
        
         const hotelData = hotelsName.map((name, index) => ({
            name,
            location: hotelsAddress[index] || null,
            latitude: lattitude[index] || null,
            longitude: longitude[index] || null
            
         }))

            await Hotel.bulkCreate(hotelData);
            console.log("Hotels migrated successfully");
      
    }catch(err){
        console.log("Error clearing hotels:", err);
    }
}

// migrateHotels();
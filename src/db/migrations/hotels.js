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
    const allhotels = [];

    try{
        const hotelsFromJson = JSON.parse(fs.readFileSync(path.resolve("src/db/external", "hotels_2025-09-04.json"), "utf-8")); 
        const hotelsName = hotelsFromJson.map(c => c.name);
        const hotelsAddress = hotelsFromJson.map(c => c.address);
        const lattitude = hotelsFromJson.map(c => c.latitude);
        const longitude = hotelsFromJson.map(c => c.longitude);
        const cityId = hotelsFromJson.map(c => c.cityId)
        const state = hotelsFromJson.map(c => c.state)
        const hotelData = hotelsName.map((name, index) => ({
            name,
            location: Array.isArray(hotelsAddress[index])
            ? hotelsAddress[index].join(", ")  // <-- սա է նոր շտկումը
            : (typeof hotelsAddress[index] === "object" && hotelsAddress[index]?.lines)
            ? hotelsAddress[index].lines.join(", ")
            : hotelsAddress[index] || null,
            latitude: lattitude[index] || null,
            longitude: longitude[index] || null,
            // cityId: parseInt(cityId[index]) || null,
            state: state[index] || null
        }));

         
           console.log(hotelData);
            await Hotel.bulkCreate(hotelData);
            console.log("Hotels migrated successfully");
      
    }catch(err){
        console.log("Error clearing hotels:", err);
    }
}




migrateHotels();


async function updateHotelsTable() {
  try {
    await Hotel.sync({ alter: true }); 
    console.log('Hotels table updated with new fields!');
  } catch (err) {
    console.error(err);
  }
}

// updateHotelsTable();
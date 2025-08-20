import { getCityCode, getHotelsByCity } from "../../services/amadeusService.js"
import City from "../models/cities.js"
import Hotel from "../models/hotel.js";

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

export async function  migrateHotels(){
    try{
        const cities = await GetCities();
        let i = 0
        for(const cityName of cities){
            console.log(i, " - ", cityName);
            try{
                const cityCode = await getCityCode(cityName);
                console.log(cityCode)
                // const hotels = await getHotelsByCity(cityCode);

                // await Hotel.bulkCreate(hotels.map(hotel => ({name: hotel.name})))
                // return hotels;

            }catch(err) {
                console.log(err.message);
            }
            i++
        }

    }catch(err){
        console.log("Error");
    }
}


// export default async function insertHotels{
    
// }
import Hotel from "../db/models/hotel.js";

export default async function getHotelById(id){
    try{
        const hotel = await Hotel.findByPk(id);
        return hotel;
    }catch(err){
        console.error("Error in getHotelById:", err);
        throw err; 
    }
}
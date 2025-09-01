import Hotel from "../db/models/hotel.js";

export default async function getHotelById(id){
    try{
        const hotel = await Hotel.findByPk(id);
        return hotel;
    }catch(err){
        console.log(err);
    }
}
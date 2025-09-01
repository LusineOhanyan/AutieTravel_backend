import Hotel from "../db/models/hotel";

export default async function getHotelByID(id){
    try{
        const hotel = await Hotel.findByPk(id);
        return hotel;
    }catch(err){
        console.log(err);
    }
}
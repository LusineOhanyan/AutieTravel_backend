import Hotel from "../db/models/hotel.js";

export async function getHotels(req, res){
    try{
        const {cityId, stateId} = req.query;   //ask for Mushegh about this name DB
        const filter = {};

        if(cityId){
            filter.cityId = cityId;
        }

        if(stateId){
            filter.stateId = stateId;
        }
        const hotels = await Hotel.findAll({ where: filter });

        return hotels;
    }catch(err){
        console.error("Error fetching hotels:", err);
        throw err;
    }
}
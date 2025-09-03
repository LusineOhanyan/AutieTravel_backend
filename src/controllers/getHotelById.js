import getHotelById from "../services/getHotelById.js";


export async function getHotelByIDController(req, res){

    const {id} = req.query

    try{
        const hotel = await getHotelById(id);
        if(hotel){
            return res.status(200).json(hotel);
        }
    }catch(err){
        console.error("Error fetching hotel by ID:", err);
        return res.status(500).json({ error: "Internal server error" });
    }

}
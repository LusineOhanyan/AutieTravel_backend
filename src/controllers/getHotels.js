import { getHotels } from "../services/getHotels.js";

export async function getHotelsController(req, res){
    try{
        const hotels = await getHotels(req, res);
        return res.status(200).json(hotels);
    }catch(err){
        console.error("Error fetching hotels:", err);
        return res.status(500).json({ error: "Internal server error" });
        
    }
}
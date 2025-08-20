import { getStatesWithHotels } from "../services/newFile.js";

export async function getStatesWithHotelsController(req, res)
{
    try{
        const { states, hotels } = await getStatesWithHotels(req, res);

        return res.status(200).json({
            states,
            hotels
        });
    }catch (error) {
        console.error("Error in getStateWithHotelController:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
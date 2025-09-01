import State from "../db/models/states.js";
import Hotels from "../db/models/hotel.js"

export const getStatesWithHotels = async (req, res) => {
    try {
        const states = await State.findAll(
            {
                attributes: ["id", "name"],
                
            }

        );
         const hotels = await Hotels.findAll(
            {
                attributes: ["id", "name", "stateID"],
            }
         )
        return {
            states,
            hotels
        }
        
    } catch (error) {
        console.error("Error fetching states:", error);
        throw error;
    }
}

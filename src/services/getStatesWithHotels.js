import State from "../db/models/states.js";
import Hotels from "../db/models/hotel.js"
import Cities from "../db/models/cities.js";
export const getStatesWithHotels = async (req, res) => {
    try {
        const states = await State.findAll(
            {
                attributes: ["id", "name", "abbreviation", "latitute", "longitude"],
                
            }

        );
         const hotels = await Hotels.findAll(
            {
                attributes: ["id", "name"],
            }
         );

         const cityCode = await Cities.findAll(
            {
                attributes: ["id", "cityCode"],
            }
         );
        return {
            states,
            hotels,
            cityCode

        }
        
    } catch (error) {
        console.error("Error fetching states:", error);
        throw error;
    }
}

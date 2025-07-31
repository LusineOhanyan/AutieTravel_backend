import { index } from "../services/hotels.js"
import { sendResponseBody } from "../utils/responseMessage.js";

export async function indexController(req , res) {
    try {
        const { query } = req.query; 

        if (!query) {
            return sendResponseBody(res, 200, "No query provided", []);
        }
             
        const hotels = await index(query);

        sendResponseBody(res, 200, "Hotels fetched successfully", hotels);
    } catch(e) {
        console.log(e);
        sendResponseBody(res, 500, "Internal server error");
    }
}

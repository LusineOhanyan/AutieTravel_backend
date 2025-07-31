import Hotel from "../db/models/hotel.js";
import { Op } from "sequelize";

export async function index(query) {
    try {
        const hotels = await Hotel.findAll({where: {
            name: {
                [Op.like]: `%${query}%`
            },
        }})

        return hotels
    } catch(e) {
        console.log(e.message)
    }
}
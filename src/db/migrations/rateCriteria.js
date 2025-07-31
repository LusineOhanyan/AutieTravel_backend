import RateCriteria from "../models/rateCriteria.js";

export async function migrateRateCategories() {
    await RateCriteria.bulkCreate([
        {
            name: "Scene",
        },
        {
            name: "Texture",
        },
        {
            name: "Sound",
        },
        {
            name: "Visual",
        },
        {
            name: "Staff",
        }
    ])
}
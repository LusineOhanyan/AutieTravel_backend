import { Sequelize } from "sequelize";
import config from "./config.js";

import Users from "./models/user.js";
import Hotel from "./models/hotel.js";
import Reviews from "./models/review.js"
import RateCategory  from "./models/rating.js";

const dbConfig = config.development
const sequelize = new Sequelize(
    dbConfig.database , 
    dbConfig.username ,
    dbConfig.password , 
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: true,
    }
)

const models = {
    users: Users.init(sequelize),
    hotels: Hotel.init(sequelize),
    reviews: Reviews.init(sequelize),
    rate_category: RateCategory.init(sequelize),
}


export default sequelize   
 
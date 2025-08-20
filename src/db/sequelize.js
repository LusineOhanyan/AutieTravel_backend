import { Sequelize } from "sequelize";
import config from "./config.js";

import Users from "./models/user.js";
import Hotel from "./models/hotel.js";
import Reviews from "./models/reviews.js";
import RateCriteria from "./models/rateCriteria.js";
import Rates from "./models/rates.js";
import City from "./models/cities.js"
import State from "./models/states.js";

import associateModels from "./models/index.js";

const dbConfig = config.development;
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: true,
  }
);

const models = {
  users: Users.init(sequelize),
  hotels: Hotel.init(sequelize),
  reviews: Reviews.init(sequelize),
  rate_category: RateCriteria.init(sequelize),
  rates: Rates.init(sequelize),
  cities: City.init(sequelize),
  states: State.init(sequelize)
  
};

associateModels();

export default sequelize;

import Users from "./user.js";
import Reviews from "./reviews.js";
import Hotel from "./hotel.js";
import RateCriteria from "./rateCriteria.js";
import Rates from "./rates.js";
import State  from "./states.js";
import City from "./cities.js";

const associateModels = () => {
  Users.hasMany(Reviews, { foreignKey: "userID" });
  Reviews.belongsTo(Users, { foreignKey: "userID" });

  Hotel.hasMany(Reviews, { foreignKey: "hotelID" });
  Reviews.belongsTo(Hotel, { foreignKey: "hotelID" });

  RateCriteria.hasMany(Reviews, { foreignKey: "rateCriteriaID" });
  Reviews.belongsTo(RateCriteria, { foreignKey: "rateCriteriaID" });

  Reviews.hasMany(Rates, {foreignKey: "reviewID"});
  Rates.belongsTo(Reviews, {foreignKey: "reviewID"});
  
  State.hasMany(City, { foreignKey: "stateId" });
  Hotel.belongsTo(City, { foreignKey: "stateId" });
};

export default associateModels;

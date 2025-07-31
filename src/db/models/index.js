import Users from "./user.js";
import Reviews from "./reviews.js";
import Hotel from "./hotel.js";
import RateCriteria from "./rateCriteria.js";
import Rates from "./rates.js";

const associateModels = () => {
  Users.hasMany(Reviews, { foreignKey: "userID" });
  Reviews.belongsTo(Users, { foreignKey: "userID" });

  Hotel.hasMany(Reviews, { foreignKey: "hotelID" });
  Reviews.belongsTo(Hotel, { foreignKey: "hotelID" });

  RateCriteria.hasMany(Reviews, { foreignKey: "rateCriteriaID" });
  Reviews.belongsTo(RateCriteria, { foreignKey: "rateCriteriaID" });

  Reviews.hasMany(Rates, {foreignKey: "reviewID"});
  Rates.belongsTo(Reviews, {foreignKey: "reviewID"});

};

export default associateModels;

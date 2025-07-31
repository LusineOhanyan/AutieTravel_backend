import { Model, DataTypes } from "sequelize";

class RateCriteria extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "RateCriteria",
        tableName: "rate_criteria",
        timestamps: false,
      }
    );
  }
}

export default RateCriteria;

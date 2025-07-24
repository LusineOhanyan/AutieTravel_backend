import { Model, DataTypes } from "sequelize";

class RateCategory extends Model {
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
        modelName: "RateCategory",
        tableName: "rate_category",
        timestamps: false,
      }
    );
  }
}

export default RateCategory;

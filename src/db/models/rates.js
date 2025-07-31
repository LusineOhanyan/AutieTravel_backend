import { Model, DataTypes } from "sequelize";

class Rates extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },

        value: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 10,
          },
        },

        rateCriteriaID: {
          type: DataTypes.INTEGER,
        },

        reviewID: {
          type: DataTypes.INTEGER,
        }

      },

      {
        sequelize,
        modelName: "Rates",
        tableName: "rates",
        timestamps: false,
      }
    );
  }
}

export default Rates;

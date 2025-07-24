import { Model, DataTypes } from "sequelize";

class Reviews extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },

        rate: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 10,
          },
        },

        userID: {
          type: DataTypes.INTEGER,
        },

        reviewCategoryID: {
          type: DataTypes.INTEGER,
        },

        hotelID: {
          type: DataTypes.INTEGER,
        },
      },

      {
        sequelize,
        modelName: "Reviews",
        tableName: "reviews",
        timestamps: false,
      }
    );
  }
}

export default Reviews;

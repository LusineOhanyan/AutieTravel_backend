import { Model, DataTypes } from "sequelize";

class City extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        hasHotels_YN: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },

        stateId:{
          type: DataTypes.INTEGER,
        },

        isFetched: {
           type: DataTypes.BOOLEAN,
           defaultValue: false
          },
        cityCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
      {   
        sequelize,
        modelName: "Cities",
        tableName: "cities",
        timestamps: false,
      }
      
    );
  }
}

export default City;
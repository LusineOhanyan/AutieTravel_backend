import { Model, DataTypes } from "sequelize";

class State extends Model {
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
        abbreviation: {
          type: DataTypes.STRING,
          
        },

        latitute:{
          type: DataTypes.FLOAT
        },
        longitude:{
           type: DataTypes.FLOAT
        }
      },
      {
        sequelize,
        modelName: "State",
        tableName: "states",
        timestamps: false,
      }
    );
  }
}

export default State;

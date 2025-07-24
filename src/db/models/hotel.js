import { Model, DataTypes } from "sequelize";

class Hotel extends Model {
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
            type : DataTypes.STRING,
        },

      },
      {
        sequelize,
        modelName: "Hotel",   
        tableName: "hotels", 
        timestamps: false,
      }
    );
  }
}

export default Hotel;

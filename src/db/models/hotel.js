// 


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
          type: DataTypes.STRING,
          allowNull: false,
        },
        social_links: {
          type: DataTypes.JSONB, // works only in Postgres
        },
        location: {
          type: DataTypes.STRING, // կամ DataTypes.GEOMETRY('POINT')
        },
        description: {
          type: DataTypes.TEXT,
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true,
          },
        },
        phone: {
          type: DataTypes.STRING, // ավելի լավ է string պահել
        },
        cityId: { 
          type: DataTypes.INTEGER,
          references: {
            model: "states",
            key: "id",
          },
        },
        latitude: {
          type: DataTypes.FLOAT,
        },
        longitude: {
          type: DataTypes.FLOAT,
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

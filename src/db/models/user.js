import { Model, DataTypes } from "sequelize";

class Users extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: { args: [8, 100] },
          },
        },
      },
      {
        sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: false,
      }
    );
  }
}

export default Users;

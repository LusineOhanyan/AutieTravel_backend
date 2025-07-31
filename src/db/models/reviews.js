import {Model, DataTypes} from "sequelize"

class Reviews extends Model{
    static init(sequelize){
        return super.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },

                comment: {
                    type: DataTypes.TEXT,

                },

                hotelID:{
                       type: DataTypes.INTEGER
                },

                userID: {
                    type: DataTypes.INTEGER
                },
            },
            {
                sequelize,
                modelName: "Reviews",
                tableName: "reviews",
                timestamps: false,
            }
        )
    }
}

export default Reviews
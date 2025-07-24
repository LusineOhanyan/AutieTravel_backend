import { Model, DataTypes } from "sequelize";

class Reviews extends  Model{
  static init (sequelize) {
    return super.init(
         {
            hotelID: {
                type: DataTypes.STRING,
                unique: true,
                
            },
            
            userID: {
                type: DataTypes.STRING,
                unique: true,

            },

            rateID: {
                type: DataTypes.INTEGER,
                references:{
                    model: 'rates',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'


            },


        },
        
        {
        sequelize,
        modelName: "Rate",   
        tableName: "rates", 
        timestamps: false,
      }


    );
  }
}

export default Reviews
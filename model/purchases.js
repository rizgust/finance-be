const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Purchases = sequelize.define('purchases',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    user_id:{ type:DataTypes.INTEGER },
    number:{ type:DataTypes.STRING },
    ap_id:{ type:DataTypes.INTEGER },
    status:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
    amount_paid:{ type:DataTypes.DECIMAL },
    date:{ type:DataTypes.DATEONLY },
    due_date:{ type:DataTypes.DATEONLY },
    additional_info:{ type:DataTypes.STRING },
    period_id:{ type:DataTypes.INTEGER },
    expense_id:{ type:DataTypes.INTEGER },
    discount_id:{ type:DataTypes.INTEGER },
    created_at:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    created_by:{ type:DataTypes.INTEGER },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    deleted_at:{ type:DataTypes.DATE },
    deleted_by:{ type:DataTypes.INTEGER },
    isActive:{ type:DataTypes.BOOLEAN },
    isDeleted:{ type:DataTypes.BOOLEAN }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (purchases,options){
          purchases.isActive = true;
          purchases.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (purchases,options){
          if (purchases !== undefined && purchases.length) { 
            for (let index = 0; index < purchases.length; index++) { 
              const element = purchases[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Purchases.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Purchases);
  sequelizePaginate.paginate(Purchases);
  return Purchases;
}
module.exports = makeModel;
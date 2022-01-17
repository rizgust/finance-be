const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Trx_receives = sequelize.define('trx_receives',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    user_id:{ type:DataTypes.INTEGER },
    number:{ type:DataTypes.STRING },
    amount:{ type:DataTypes.DECIMAL },
    date:{ type:DataTypes.DATEONLY },
    status:{ type:DataTypes.INTEGER },
    description:{ type:DataTypes.STRING },
    payment_method:{ type:DataTypes.INTEGER },
    created_at:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    created_by:{ type:DataTypes.INTEGER },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    journal_id:{ type:DataTypes.INTEGER },
    isActive:{ type:DataTypes.BOOLEAN },
    isDeleted:{ type:DataTypes.BOOLEAN }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (trx_receives,options){
          trx_receives.isActive = true;
          trx_receives.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (trx_receives,options){
          if (trx_receives !== undefined && trx_receives.length) { 
            for (let index = 0; index < trx_receives.length; index++) { 
              const element = trx_receives[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Trx_receives.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Trx_receives);
  sequelizePaginate.paginate(Trx_receives);
  return Trx_receives;
}
module.exports = makeModel;
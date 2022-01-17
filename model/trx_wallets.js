const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Trx_wallets = sequelize.define('trx_wallets',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    wallet_id:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
    balance_before:{ type:DataTypes.DECIMAL },
    balance:{ type:DataTypes.DECIMAL },
    dest_model:{ type:DataTypes.STRING },
    dest_model_id:{ type:DataTypes.INTEGER },
    trx_receives_id:{ type:DataTypes.INTEGER },
    created_at:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    created_by:{ type:DataTypes.BIGINT },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    debit:{ type:DataTypes.BOOLEAN },
    isActive:{ type:DataTypes.BOOLEAN },
    isDeleted:{ type:DataTypes.BOOLEAN }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (trx_wallets,options){
          trx_wallets.isActive = true;
          trx_wallets.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (trx_wallets,options){
          if (trx_wallets !== undefined && trx_wallets.length) { 
            for (let index = 0; index < trx_wallets.length; index++) { 
              const element = trx_wallets[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Trx_wallets.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Trx_wallets);
  sequelizePaginate.paginate(Trx_wallets);
  return Trx_wallets;
}
module.exports = makeModel;
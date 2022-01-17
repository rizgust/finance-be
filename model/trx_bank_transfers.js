const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Trx_bank_transfers = sequelize.define('trx_bank_transfers',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    user_id:{ type:DataTypes.INTEGER },
    bank_id:{ type:DataTypes.INTEGER },
    number:{ type:DataTypes.STRING },
    date:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    status:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
    description:{ type:DataTypes.STRING },
    dest_model:{ type:DataTypes.STRING },
    dest_model_id:{ type:DataTypes.INTEGER },
    account_owner:{ type:DataTypes.STRING },
    account_number:{ type:DataTypes.STRING },
    additional_info:{ type:DataTypes.STRING },
    trx_receives_id:{ type:DataTypes.INTEGER },
    created_at:{ type:DataTypes.DATE },
    created_by:{ type:DataTypes.INTEGER },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    isActive:{ type:DataTypes.BOOLEAN },
    isDeleted:{ type:DataTypes.BOOLEAN }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (trx_bank_transfers,options){
          trx_bank_transfers.isActive = true;
          trx_bank_transfers.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (trx_bank_transfers,options){
          if (trx_bank_transfers !== undefined && trx_bank_transfers.length) { 
            for (let index = 0; index < trx_bank_transfers.length; index++) { 
              const element = trx_bank_transfers[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Trx_bank_transfers.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Trx_bank_transfers);
  sequelizePaginate.paginate(Trx_bank_transfers);
  return Trx_bank_transfers;
}
module.exports = makeModel;
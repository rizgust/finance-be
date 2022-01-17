const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const General_ledger_details = sequelize.define('general_ledger_details',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    general_ledger_id:{ type:DataTypes.INTEGER },
    account_id:{ type:DataTypes.INTEGER },
    debit:{ type:DataTypes.DECIMAL },
    credit:{ type:DataTypes.DECIMAL },
    balance_before:{ type:DataTypes.DECIMAL },
    balance:{ type:DataTypes.DECIMAL },
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
        async function (general_ledger_details,options){
          general_ledger_details.isActive = true;
          general_ledger_details.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (general_ledger_details,options){
          if (general_ledger_details !== undefined && general_ledger_details.length) { 
            for (let index = 0; index < general_ledger_details.length; index++) { 
              const element = general_ledger_details[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  General_ledger_details.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(General_ledger_details);
  sequelizePaginate.paginate(General_ledger_details);
  return General_ledger_details;
}
module.exports = makeModel;
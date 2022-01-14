const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Account_payables = sequelize.define('account_payables',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    code:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    description:{ type:DataTypes.STRING },
    src_account_id:{ type:DataTypes.INTEGER },
    dst_account_id:{ type:DataTypes.INTEGER },
    recurring_type:{ type:DataTypes.INTEGER },
    recurring_periode:{ type:DataTypes.INTEGER },
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
        async function (account_payables,options){
          account_payables.isActive = true;
          account_payables.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (account_payables,options){
          if (account_payables !== undefined && account_payables.length) { 
            for (let index = 0; index < account_payables.length; index++) { 
              const element = account_payables[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Account_payables.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Account_payables);
  sequelizePaginate.paginate(Account_payables);
  return Account_payables;
}
module.exports = makeModel;
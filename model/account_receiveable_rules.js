const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Account_receiveable_rules = sequelize.define('account_receiveable_rules',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    ar_id:{ type:DataTypes.INTEGER },
    period_id:{ type:DataTypes.INTEGER },
    rule:{ type:DataTypes.STRING },
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
        async function (account_receiveable_rules,options){
          account_receiveable_rules.isActive = true;
          account_receiveable_rules.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (account_receiveable_rules,options){
          if (account_receiveable_rules !== undefined && account_receiveable_rules.length) { 
            for (let index = 0; index < account_receiveable_rules.length; index++) { 
              const element = account_receiveable_rules[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Account_receiveable_rules.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Account_receiveable_rules);
  sequelizePaginate.paginate(Account_receiveable_rules);
  return Account_receiveable_rules;
}
module.exports = makeModel;
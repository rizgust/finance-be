const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Account_receiveables = sequelize.define('account_receiveables',{
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
    user_type:{ type:DataTypes.INTEGER },
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
        async function (account_receiveables,options){
          account_receiveables.isActive = true;
          account_receiveables.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (account_receiveables,options){
          if (account_receiveables !== undefined && account_receiveables.length) { 
            for (let index = 0; index < account_receiveables.length; index++) { 
              const element = account_receiveables[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Account_receiveables.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Account_receiveables);
  sequelizePaginate.paginate(Account_receiveables);
  return Account_receiveables;
}
module.exports = makeModel;
const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Wallets = sequelize.define('wallets',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    user_id:{ type:DataTypes.INTEGER },
    code:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    balance:{ type:DataTypes.DECIMAL },
    account_id:{ type:DataTypes.INTEGER },
    other_info:{ type:DataTypes.STRING },
    allow_minus:{ type:DataTypes.BOOLEAN },
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
        async function (wallets,options){
          wallets.isActive = true;
          wallets.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (wallets,options){
          if (wallets !== undefined && wallets.length) { 
            for (let index = 0; index < wallets.length; index++) { 
              const element = wallets[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Wallets.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Wallets);
  sequelizePaginate.paginate(Wallets);
  return Wallets;
}
module.exports = makeModel;
const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const M_bank_accounts = sequelize.define('m_bank_accounts',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    bank_id:{ type:DataTypes.INTEGER },
    branch_name:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    number:{ type:DataTypes.STRING },
    created_at:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    created_by:{ type:DataTypes.INTEGER },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    isActive:{ type:DataTypes.BOOLEAN },
    createdAt:{ type:DataTypes.DATE },
    updatedAt:{ type:DataTypes.DATE },
    addedBy:{ type:DataTypes.INTEGER },
    updatedBy:{ type:DataTypes.INTEGER },
    isDeleted:{ type:DataTypes.BOOLEAN }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (m_bank_accounts,options){
          m_bank_accounts.isActive = true;
          m_bank_accounts.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (m_bank_accounts,options){
          if (m_bank_accounts !== undefined && m_bank_accounts.length) { 
            for (let index = 0; index < m_bank_accounts.length; index++) { 
              const element = m_bank_accounts[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  M_bank_accounts.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(M_bank_accounts);
  sequelizePaginate.paginate(M_bank_accounts);
  return M_bank_accounts;
}
module.exports = makeModel;
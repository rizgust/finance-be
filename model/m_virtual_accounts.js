const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const M_virtual_accounts = sequelize.define('m_virtual_accounts',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    bank_id:{ type:DataTypes.INTEGER },
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
        async function (m_virtual_accounts,options){
          m_virtual_accounts.isActive = true;
          m_virtual_accounts.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (m_virtual_accounts,options){
          if (m_virtual_accounts !== undefined && m_virtual_accounts.length) { 
            for (let index = 0; index < m_virtual_accounts.length; index++) { 
              const element = m_virtual_accounts[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  M_virtual_accounts.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(M_virtual_accounts);
  sequelizePaginate.paginate(M_virtual_accounts);
  return M_virtual_accounts;
}
module.exports = makeModel;
const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const M_chart_of_accounts = sequelize.define('m_chart_of_accounts',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    code:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    description:{ type:DataTypes.STRING },
    category:{ type:DataTypes.INTEGER },
    level:{ type:DataTypes.INTEGER },
    created_at:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    created_by:{ type:DataTypes.INTEGER },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    deleted_at:{ type:DataTypes.DATE },
    deleted_by:{ type:DataTypes.INTEGER },
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
        async function (m_chart_of_accounts,options){
          m_chart_of_accounts.isActive = true;
          m_chart_of_accounts.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (m_chart_of_accounts,options){
          if (m_chart_of_accounts !== undefined && m_chart_of_accounts.length) { 
            for (let index = 0; index < m_chart_of_accounts.length; index++) { 
              const element = m_chart_of_accounts[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  M_chart_of_accounts.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(M_chart_of_accounts);
  sequelizePaginate.paginate(M_chart_of_accounts);
  return M_chart_of_accounts;
}
module.exports = makeModel;
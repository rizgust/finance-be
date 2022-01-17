const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const M_discounts = sequelize.define('m_discounts',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    code:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    description:{ type:DataTypes.STRING },
    is_active:{ type:DataTypes.BOOLEAN },
    value:{ type:DataTypes.DECIMAL },
    is_percent:{ type:DataTypes.BOOLEAN },
    start_date:{ type:DataTypes.DATEONLY },
    end_date:{ type:DataTypes.DATEONLY },
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
        async function (m_discounts,options){
          m_discounts.isActive = true;
          m_discounts.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (m_discounts,options){
          if (m_discounts !== undefined && m_discounts.length) { 
            for (let index = 0; index < m_discounts.length; index++) { 
              const element = m_discounts[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  M_discounts.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(M_discounts);
  sequelizePaginate.paginate(M_discounts);
  return M_discounts;
}
module.exports = makeModel;
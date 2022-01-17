const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const General_ledgers = sequelize.define('general_ledgers',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    number:{ type:DataTypes.STRING },
    status:{ type:DataTypes.INTEGER },
    date:{ type:DataTypes.DATEONLY },
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
        async function (general_ledgers,options){
          general_ledgers.isActive = true;
          general_ledgers.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (general_ledgers,options){
          if (general_ledgers !== undefined && general_ledgers.length) { 
            for (let index = 0; index < general_ledgers.length; index++) { 
              const element = general_ledgers[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  General_ledgers.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(General_ledgers);
  sequelizePaginate.paginate(General_ledgers);
  return General_ledgers;
}
module.exports = makeModel;
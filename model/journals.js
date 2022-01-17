const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Journals = sequelize.define('journals',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    number:{ type:DataTypes.STRING },
    date:{ type:DataTypes.DATEONLY },
    general_ledger_id:{ type:DataTypes.INTEGER },
    status:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
    description:{ type:DataTypes.STRING },
    reff_model:{ type:DataTypes.STRING },
    reff_model_id:{ type:DataTypes.INTEGER },
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
        async function (journals,options){
          journals.isActive = true;
          journals.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (journals,options){
          if (journals !== undefined && journals.length) { 
            for (let index = 0; index < journals.length; index++) { 
              const element = journals[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Journals.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Journals);
  sequelizePaginate.paginate(Journals);
  return Journals;
}
module.exports = makeModel;
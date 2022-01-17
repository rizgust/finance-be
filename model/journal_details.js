const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Journal_details = sequelize.define('journal_details',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    account_id:{ type:DataTypes.BIGINT },
    journal_id:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
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
        async function (journal_details,options){
          journal_details.isActive = true;
          journal_details.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (journal_details,options){
          if (journal_details !== undefined && journal_details.length) { 
            for (let index = 0; index < journal_details.length; index++) { 
              const element = journal_details[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Journal_details.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Journal_details);
  sequelizePaginate.paginate(Journal_details);
  return Journal_details;
}
module.exports = makeModel;
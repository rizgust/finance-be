const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Trx_receive_details = sequelize.define('trx_receive_details',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    trx_receives_id:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
    is_source:{ type:DataTypes.BOOLEAN },
    account_id:{ type:DataTypes.INTEGER },
    model:{ type:DataTypes.STRING },
    model_id:{ type:DataTypes.INTEGER },
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
        async function (trx_receive_details,options){
          trx_receive_details.isActive = true;
          trx_receive_details.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (trx_receive_details,options){
          if (trx_receive_details !== undefined && trx_receive_details.length) { 
            for (let index = 0; index < trx_receive_details.length; index++) { 
              const element = trx_receive_details[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Trx_receive_details.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Trx_receive_details);
  sequelizePaginate.paginate(Trx_receive_details);
  return Trx_receive_details;
}
module.exports = makeModel;
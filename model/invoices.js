const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Invoices = sequelize.define('invoices',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    owner_id:{ type:DataTypes.INTEGER },
    user_id:{ type:DataTypes.INTEGER },
    number:{ type:DataTypes.STRING },
    ar_id:{ type:DataTypes.INTEGER },
    status:{ type:DataTypes.INTEGER },
    amount:{ type:DataTypes.DECIMAL },
    amount_paid:{ type:DataTypes.DECIMAL },
    date:{ type:DataTypes.DATEONLY },
    due_date:{ type:DataTypes.DATEONLY },
    additional_info:{ type:DataTypes.STRING },
    payment_id:{ type:DataTypes.INTEGER },
    discount_id:{ type:DataTypes.INTEGER },
    created_at:{ type:DataTypes.DATE },
    with:{ type:DataTypes.STRING },
    zone:{ type:DataTypes.STRING },
    created_by:{ type:DataTypes.INTEGER },
    updated_at:{ type:DataTypes.DATE },
    updated_by:{ type:DataTypes.INTEGER },
    deleted_at:{ type:DataTypes.DATE },
    deleted_by:{ type:DataTypes.INTEGER },
    period_id:{ type:DataTypes.INTEGER },
    class_program_id:{ type:DataTypes.INTEGER },
    class_level_id:{ type:DataTypes.INTEGER },
    class_specialization_id:{ type:DataTypes.INTEGER },
    male:{ type:DataTypes.BOOLEAN },
    recurring_type:{ type:DataTypes.INTEGER },
    recurring_period:{ type:DataTypes.INTEGER },
    installment:{ type:DataTypes.INTEGER },
    mutation:{ type:DataTypes.BOOLEAN },
    boarding:{ type:DataTypes.BOOLEAN },
    admission_line_id:{ type:DataTypes.INTEGER },
    admission_batch_id:{ type:DataTypes.INTEGER },
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
        async function (invoices,options){
          invoices.isActive = true;
          invoices.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (invoices,options){
          if (invoices !== undefined && invoices.length) { 
            for (let index = 0; index < invoices.length; index++) { 
              const element = invoices[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Invoices.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Invoices);
  sequelizePaginate.paginate(Invoices);
  return Invoices;
}
module.exports = makeModel;
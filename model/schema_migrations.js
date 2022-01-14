const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const Schema_migrations = sequelize.define('schema_migrations',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    version:{ type:DataTypes.BIGINT },
    dirty:{ type:DataTypes.BOOLEAN },
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
        async function (schema_migrations,options){
          schema_migrations.isActive = true;
          schema_migrations.isDeleted = false;

        },
      ],
      beforeBulkCreate: [
        async function (schema_migrations,options){
          if (schema_migrations !== undefined && schema_migrations.length) { 
            for (let index = 0; index < schema_migrations.length; index++) { 
              const element = schema_migrations[index]; 
              element.isActive = true; 
              element.isDeleted = false; 
  
            } 
          }
        },
      ],
    } 
  }
  );
  Schema_migrations.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    
    return values;
  };
  sequelizeTransforms(Schema_migrations);
  sequelizePaginate.paginate(Schema_migrations);
  return Schema_migrations;
}
module.exports = makeModel;
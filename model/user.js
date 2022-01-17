const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
function makeModel (sequelize){
  const User = sequelize.define('user',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    username:{ type:DataTypes.STRING },
    password:{ type:DataTypes.STRING },
    email:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    isActive:{ type:DataTypes.BOOLEAN },
    createdAt:{ type:DataTypes.DATE },
    updatedAt:{ type:DataTypes.DATE },
    addedBy:{ type:DataTypes.INTEGER },
    updatedBy:{ type:DataTypes.INTEGER },
    isDeleted:{ type:DataTypes.BOOLEAN },
    mobileNo:{ type:DataTypes.STRING },
    role:{
      type:DataTypes.INTEGER,
      required:true
    }
  }
  ,{
    hooks:{
      beforeCreate: [
        async function (user,options){
          if (user.password){ user.password =
          await bcrypt.hash(user.password, 8);}
          user.isActive = true;
          user.isDeleted = false;

        },
      ],
      afterCreate: [
        async function (user,options){
          sequelize.model('userAuthSettings').create({ userId:user.id });
        },
      ],
    } 
  }
  );
  User.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };
  User.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.password;
    
    return values;
  };
  sequelizeTransforms(User);
  sequelizePaginate.paginate(User);
  return User;
}
module.exports = makeModel;
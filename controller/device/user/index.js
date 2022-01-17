const userModel = require('../../../model').user;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/userValidation');
const insertUserValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateUserValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeUser = require('../../../entity/user')({
  insertUserValidator,
  updateUserValidator,
  filterValidator,
  userModel
});
const userService = require('../../../services/dbService')({
  model:userModel,
  makeUser
});
const makeUserController = require('./user');
const authService = require('../../../services/auth')({
  model:userModel,
  userService
});
const userController = makeUserController({
  userService,
  makeUser,
  authService
});
module.exports = userController;
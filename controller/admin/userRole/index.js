const userRoleModel = require('../../../model').userRole;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/userRoleValidation');
const insertUserRoleValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateUserRoleValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeUserRole = require('../../../entity/userRole')({
  insertUserRoleValidator,
  updateUserRoleValidator,
  filterValidator,
  userRoleModel
});
const userRoleService = require('../../../services/dbService')({
  model:userRoleModel,
  makeUserRole
});
const makeUserRoleController = require('./userRole');
const userRoleController = makeUserRoleController({
  userRoleService,
  makeUserRole
});
module.exports = userRoleController;
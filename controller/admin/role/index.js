const roleModel = require('../../../model').role;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/roleValidation');
const insertRoleValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateRoleValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeRole = require('../../../entity/role')({
  insertRoleValidator,
  updateRoleValidator,
  filterValidator,
  roleModel
});
const roleService = require('../../../services/dbService')({
  model:roleModel,
  makeRole
});
const makeRoleController = require('./role');
const roleController = makeRoleController({
  roleService,
  makeRole
});
module.exports = roleController;
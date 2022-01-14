const routeRoleModel = require('../../../model').routeRole;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/routeRoleValidation');
const insertRouteRoleValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateRouteRoleValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeRouteRole = require('../../../entity/routeRole')({
  insertRouteRoleValidator,
  updateRouteRoleValidator,
  filterValidator,
  routeRoleModel
});
const routeRoleService = require('../../../services/dbService')({
  model:routeRoleModel,
  makeRouteRole
});
const makeRouteRoleController = require('./routeRole');
const routeRoleController = makeRouteRoleController({
  routeRoleService,
  makeRouteRole
});
module.exports = routeRoleController;
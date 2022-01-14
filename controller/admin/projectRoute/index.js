const projectRouteModel = require('../../../model').projectRoute;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/projectRouteValidation');
const insertProjectRouteValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateProjectRouteValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeProjectRoute = require('../../../entity/projectRoute')({
  insertProjectRouteValidator,
  updateProjectRouteValidator,
  filterValidator,
  projectRouteModel
});
const projectRouteService = require('../../../services/dbService')({
  model:projectRouteModel,
  makeProjectRoute
});
const makeProjectRouteController = require('./projectRoute');
const projectRouteController = makeProjectRouteController({
  projectRouteService,
  makeProjectRoute
});
module.exports = projectRouteController;
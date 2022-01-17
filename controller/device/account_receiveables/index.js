const account_receiveablesModel = require('../../../model').account_receiveables;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/account_receiveablesValidation');
const insertAccount_receiveablesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateAccount_receiveablesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeAccount_receiveables = require('../../../entity/account_receiveables')({
  insertAccount_receiveablesValidator,
  updateAccount_receiveablesValidator,
  filterValidator,
  account_receiveablesModel
});
const account_receiveablesService = require('../../../services/dbService')({
  model:account_receiveablesModel,
  makeAccount_receiveables
});
const makeAccount_receiveablesController = require('./account_receiveables');
const account_receiveablesController = makeAccount_receiveablesController({
  account_receiveablesService,
  makeAccount_receiveables
});
module.exports = account_receiveablesController;
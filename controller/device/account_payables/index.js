const account_payablesModel = require('../../../model').account_payables;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/account_payablesValidation');
const insertAccount_payablesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateAccount_payablesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeAccount_payables = require('../../../entity/account_payables')({
  insertAccount_payablesValidator,
  updateAccount_payablesValidator,
  filterValidator,
  account_payablesModel
});
const account_payablesService = require('../../../services/dbService')({
  model:account_payablesModel,
  makeAccount_payables
});
const makeAccount_payablesController = require('./account_payables');
const account_payablesController = makeAccount_payablesController({
  account_payablesService,
  makeAccount_payables
});
module.exports = account_payablesController;
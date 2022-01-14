const account_payable_rulesModel = require('../../../model').account_payable_rules;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/account_payable_rulesValidation');
const insertAccount_payable_rulesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateAccount_payable_rulesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeAccount_payable_rules = require('../../../entity/account_payable_rules')({
  insertAccount_payable_rulesValidator,
  updateAccount_payable_rulesValidator,
  filterValidator,
  account_payable_rulesModel
});
const account_payable_rulesService = require('../../../services/dbService')({
  model:account_payable_rulesModel,
  makeAccount_payable_rules
});
const makeAccount_payable_rulesController = require('./account_payable_rules');
const account_payable_rulesController = makeAccount_payable_rulesController({
  account_payable_rulesService,
  makeAccount_payable_rules
});
module.exports = account_payable_rulesController;
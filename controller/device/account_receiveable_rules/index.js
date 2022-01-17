const account_receiveable_rulesModel = require('../../../model').account_receiveable_rules;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/account_receiveable_rulesValidation');
const insertAccount_receiveable_rulesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateAccount_receiveable_rulesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeAccount_receiveable_rules = require('../../../entity/account_receiveable_rules')({
  insertAccount_receiveable_rulesValidator,
  updateAccount_receiveable_rulesValidator,
  filterValidator,
  account_receiveable_rulesModel
});
const account_receiveable_rulesService = require('../../../services/dbService')({
  model:account_receiveable_rulesModel,
  makeAccount_receiveable_rules
});
const makeAccount_receiveable_rulesController = require('./account_receiveable_rules');
const account_receiveable_rulesController = makeAccount_receiveable_rulesController({
  account_receiveable_rulesService,
  makeAccount_receiveable_rules
});
module.exports = account_receiveable_rulesController;
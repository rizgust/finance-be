const m_bank_accountsModel = require('../../../model').m_bank_accounts;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/m_bank_accountsValidation');
const insertM_bank_accountsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateM_bank_accountsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeM_bank_accounts = require('../../../entity/m_bank_accounts')({
  insertM_bank_accountsValidator,
  updateM_bank_accountsValidator,
  filterValidator,
  m_bank_accountsModel
});
const m_bank_accountsService = require('../../../services/dbService')({
  model:m_bank_accountsModel,
  makeM_bank_accounts
});
const makeM_bank_accountsController = require('./m_bank_accounts');
const m_bank_accountsController = makeM_bank_accountsController({
  m_bank_accountsService,
  makeM_bank_accounts
});
module.exports = m_bank_accountsController;
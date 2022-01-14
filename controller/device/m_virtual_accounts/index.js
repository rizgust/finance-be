const m_virtual_accountsModel = require('../../../model').m_virtual_accounts;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/m_virtual_accountsValidation');
const insertM_virtual_accountsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateM_virtual_accountsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeM_virtual_accounts = require('../../../entity/m_virtual_accounts')({
  insertM_virtual_accountsValidator,
  updateM_virtual_accountsValidator,
  filterValidator,
  m_virtual_accountsModel
});
const m_virtual_accountsService = require('../../../services/dbService')({
  model:m_virtual_accountsModel,
  makeM_virtual_accounts
});
const makeM_virtual_accountsController = require('./m_virtual_accounts');
const m_virtual_accountsController = makeM_virtual_accountsController({
  m_virtual_accountsService,
  makeM_virtual_accounts
});
module.exports = m_virtual_accountsController;
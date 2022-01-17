const m_chart_of_accountsModel = require('../../../model').m_chart_of_accounts;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/m_chart_of_accountsValidation');
const insertM_chart_of_accountsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateM_chart_of_accountsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeM_chart_of_accounts = require('../../../entity/m_chart_of_accounts')({
  insertM_chart_of_accountsValidator,
  updateM_chart_of_accountsValidator,
  filterValidator,
  m_chart_of_accountsModel
});
const m_chart_of_accountsService = require('../../../services/dbService')({
  model:m_chart_of_accountsModel,
  makeM_chart_of_accounts
});
const makeM_chart_of_accountsController = require('./m_chart_of_accounts');
const m_chart_of_accountsController = makeM_chart_of_accountsController({
  m_chart_of_accountsService,
  makeM_chart_of_accounts
});
module.exports = m_chart_of_accountsController;
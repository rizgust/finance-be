const m_banksModel = require('../../../model').m_banks;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/m_banksValidation');
const insertM_banksValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateM_banksValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeM_banks = require('../../../entity/m_banks')({
  insertM_banksValidator,
  updateM_banksValidator,
  filterValidator,
  m_banksModel
});
const m_banksService = require('../../../services/dbService')({
  model:m_banksModel,
  makeM_banks
});
const makeM_banksController = require('./m_banks');
const m_banksController = makeM_banksController({
  m_banksService,
  makeM_banks
});
module.exports = m_banksController;
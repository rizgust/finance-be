const m_discountsModel = require('../../../model').m_discounts;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/m_discountsValidation');
const insertM_discountsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateM_discountsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeM_discounts = require('../../../entity/m_discounts')({
  insertM_discountsValidator,
  updateM_discountsValidator,
  filterValidator,
  m_discountsModel
});
const m_discountsService = require('../../../services/dbService')({
  model:m_discountsModel,
  makeM_discounts
});
const makeM_discountsController = require('./m_discounts');
const m_discountsController = makeM_discountsController({
  m_discountsService,
  makeM_discounts
});
module.exports = m_discountsController;
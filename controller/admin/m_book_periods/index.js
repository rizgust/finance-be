const m_book_periodsModel = require('../../../model').m_book_periods;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/m_book_periodsValidation');
const insertM_book_periodsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateM_book_periodsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeM_book_periods = require('../../../entity/m_book_periods')({
  insertM_book_periodsValidator,
  updateM_book_periodsValidator,
  filterValidator,
  m_book_periodsModel
});
const m_book_periodsService = require('../../../services/dbService')({
  model:m_book_periodsModel,
  makeM_book_periods
});
const makeM_book_periodsController = require('./m_book_periods');
const m_book_periodsController = makeM_book_periodsController({
  m_book_periodsService,
  makeM_book_periods
});
module.exports = m_book_periodsController;
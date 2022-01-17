const trx_expense_detailsModel = require('../../../model').trx_expense_details;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/trx_expense_detailsValidation');
const insertTrx_expense_detailsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateTrx_expense_detailsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeTrx_expense_details = require('../../../entity/trx_expense_details')({
  insertTrx_expense_detailsValidator,
  updateTrx_expense_detailsValidator,
  filterValidator,
  trx_expense_detailsModel
});
const trx_expense_detailsService = require('../../../services/dbService')({
  model:trx_expense_detailsModel,
  makeTrx_expense_details
});
const makeTrx_expense_detailsController = require('./trx_expense_details');
const trx_expense_detailsController = makeTrx_expense_detailsController({
  trx_expense_detailsService,
  makeTrx_expense_details
});
module.exports = trx_expense_detailsController;
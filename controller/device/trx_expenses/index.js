const trx_expensesModel = require('../../../model').trx_expenses;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/trx_expensesValidation');
const insertTrx_expensesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateTrx_expensesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeTrx_expenses = require('../../../entity/trx_expenses')({
  insertTrx_expensesValidator,
  updateTrx_expensesValidator,
  filterValidator,
  trx_expensesModel
});
const trx_expensesService = require('../../../services/dbService')({
  model:trx_expensesModel,
  makeTrx_expenses
});
const makeTrx_expensesController = require('./trx_expenses');
const trx_expensesController = makeTrx_expensesController({
  trx_expensesService,
  makeTrx_expenses
});
module.exports = trx_expensesController;
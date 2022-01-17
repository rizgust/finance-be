const general_ledger_detailsModel = require('../../../model').general_ledger_details;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/general_ledger_detailsValidation');
const insertGeneral_ledger_detailsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateGeneral_ledger_detailsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeGeneral_ledger_details = require('../../../entity/general_ledger_details')({
  insertGeneral_ledger_detailsValidator,
  updateGeneral_ledger_detailsValidator,
  filterValidator,
  general_ledger_detailsModel
});
const general_ledger_detailsService = require('../../../services/dbService')({
  model:general_ledger_detailsModel,
  makeGeneral_ledger_details
});
const makeGeneral_ledger_detailsController = require('./general_ledger_details');
const general_ledger_detailsController = makeGeneral_ledger_detailsController({
  general_ledger_detailsService,
  makeGeneral_ledger_details
});
module.exports = general_ledger_detailsController;
const trx_bank_transfersModel = require('../../../model').trx_bank_transfers;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/trx_bank_transfersValidation');
const insertTrx_bank_transfersValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateTrx_bank_transfersValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeTrx_bank_transfers = require('../../../entity/trx_bank_transfers')({
  insertTrx_bank_transfersValidator,
  updateTrx_bank_transfersValidator,
  filterValidator,
  trx_bank_transfersModel
});
const trx_bank_transfersService = require('../../../services/dbService')({
  model:trx_bank_transfersModel,
  makeTrx_bank_transfers
});
const makeTrx_bank_transfersController = require('./trx_bank_transfers');
const trx_bank_transfersController = makeTrx_bank_transfersController({
  trx_bank_transfersService,
  makeTrx_bank_transfers
});
module.exports = trx_bank_transfersController;
const trx_receive_detailsModel = require('../../../model').trx_receive_details;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/trx_receive_detailsValidation');
const insertTrx_receive_detailsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateTrx_receive_detailsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeTrx_receive_details = require('../../../entity/trx_receive_details')({
  insertTrx_receive_detailsValidator,
  updateTrx_receive_detailsValidator,
  filterValidator,
  trx_receive_detailsModel
});
const trx_receive_detailsService = require('../../../services/dbService')({
  model:trx_receive_detailsModel,
  makeTrx_receive_details
});
const makeTrx_receive_detailsController = require('./trx_receive_details');
const trx_receive_detailsController = makeTrx_receive_detailsController({
  trx_receive_detailsService,
  makeTrx_receive_details
});
module.exports = trx_receive_detailsController;
const trx_walletsModel = require('../../../model').trx_wallets;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/trx_walletsValidation');
const insertTrx_walletsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateTrx_walletsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeTrx_wallets = require('../../../entity/trx_wallets')({
  insertTrx_walletsValidator,
  updateTrx_walletsValidator,
  filterValidator,
  trx_walletsModel
});
const trx_walletsService = require('../../../services/dbService')({
  model:trx_walletsModel,
  makeTrx_wallets
});
const makeTrx_walletsController = require('./trx_wallets');
const trx_walletsController = makeTrx_walletsController({
  trx_walletsService,
  makeTrx_wallets
});
module.exports = trx_walletsController;
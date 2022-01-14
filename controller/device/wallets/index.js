const walletsModel = require('../../../model').wallets;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/walletsValidation');
const insertWalletsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateWalletsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeWallets = require('../../../entity/wallets')({
  insertWalletsValidator,
  updateWalletsValidator,
  filterValidator,
  walletsModel
});
const walletsService = require('../../../services/dbService')({
  model:walletsModel,
  makeWallets
});
const makeWalletsController = require('./wallets');
const walletsController = makeWalletsController({
  walletsService,
  makeWallets
});
module.exports = walletsController;
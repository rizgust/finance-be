const general_ledgersModel = require('../../../model').general_ledgers;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/general_ledgersValidation');
const insertGeneral_ledgersValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateGeneral_ledgersValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeGeneral_ledgers = require('../../../entity/general_ledgers')({
  insertGeneral_ledgersValidator,
  updateGeneral_ledgersValidator,
  filterValidator,
  general_ledgersModel
});
const general_ledgersService = require('../../../services/dbService')({
  model:general_ledgersModel,
  makeGeneral_ledgers
});
const makeGeneral_ledgersController = require('./general_ledgers');
const general_ledgersController = makeGeneral_ledgersController({
  general_ledgersService,
  makeGeneral_ledgers
});
module.exports = general_ledgersController;
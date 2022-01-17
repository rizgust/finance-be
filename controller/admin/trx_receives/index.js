const trx_receivesModel = require('../../../model').trx_receives;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/trx_receivesValidation');
const insertTrx_receivesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateTrx_receivesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeTrx_receives = require('../../../entity/trx_receives')({
  insertTrx_receivesValidator,
  updateTrx_receivesValidator,
  filterValidator,
  trx_receivesModel
});
const trx_receivesService = require('../../../services/dbService')({
  model:trx_receivesModel,
  makeTrx_receives
});
const makeTrx_receivesController = require('./trx_receives');
const trx_receivesController = makeTrx_receivesController({
  trx_receivesService,
  makeTrx_receives
});
module.exports = trx_receivesController;
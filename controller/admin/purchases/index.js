const purchasesModel = require('../../../model').purchases;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/purchasesValidation');
const insertPurchasesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updatePurchasesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makePurchases = require('../../../entity/purchases')({
  insertPurchasesValidator,
  updatePurchasesValidator,
  filterValidator,
  purchasesModel
});
const purchasesService = require('../../../services/dbService')({
  model:purchasesModel,
  makePurchases
});
const makePurchasesController = require('./purchases');
const purchasesController = makePurchasesController({
  purchasesService,
  makePurchases
});
module.exports = purchasesController;
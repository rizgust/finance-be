const invoicesModel = require('../../../model').invoices;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/invoicesValidation');
const insertInvoicesValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateInvoicesValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeInvoices = require('../../../entity/invoices')({
  insertInvoicesValidator,
  updateInvoicesValidator,
  filterValidator,
  invoicesModel
});
const invoicesService = require('../../../services/dbService')({
  model:invoicesModel,
  makeInvoices
});
const makeInvoicesController = require('./invoices');
const invoicesController = makeInvoicesController({
  invoicesService,
  makeInvoices
});
module.exports = invoicesController;
const journal_detailsModel = require('../../../model').journal_details;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/journal_detailsValidation');
const insertJournal_detailsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateJournal_detailsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeJournal_details = require('../../../entity/journal_details')({
  insertJournal_detailsValidator,
  updateJournal_detailsValidator,
  filterValidator,
  journal_detailsModel
});
const journal_detailsService = require('../../../services/dbService')({
  model:journal_detailsModel,
  makeJournal_details
});
const makeJournal_detailsController = require('./journal_details');
const journal_detailsController = makeJournal_detailsController({
  journal_detailsService,
  makeJournal_details
});
module.exports = journal_detailsController;
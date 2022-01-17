const journalsModel = require('../../../model').journals;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/journalsValidation');
const insertJournalsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateJournalsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeJournals = require('../../../entity/journals')({
  insertJournalsValidator,
  updateJournalsValidator,
  filterValidator,
  journalsModel
});
const journalsService = require('../../../services/dbService')({
  model:journalsModel,
  makeJournals
});
const makeJournalsController = require('./journals');
const journalsController = makeJournalsController({
  journalsService,
  makeJournals
});
module.exports = journalsController;
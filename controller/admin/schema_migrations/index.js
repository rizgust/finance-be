const schema_migrationsModel = require('../../../model').schema_migrations;
const { FILTER_KEYS } = require('../../../constants/filterKeys');
const {
  schemaKeys,updateSchemaKeys,findFilterKeys
} = require('../../../validation/schema_migrationsValidation');
const insertSchema_migrationsValidator = require('../../../validation/genericValidator').makeValidator(schemaKeys);
const updateSchema_migrationsValidator = require('../../../validation/genericValidator').makeValidator(updateSchemaKeys);
const filterValidator = require('../../../validation/genericValidator').validateFilterWithJoi(findFilterKeys,FILTER_KEYS);
const makeSchema_migrations = require('../../../entity/schema_migrations')({
  insertSchema_migrationsValidator,
  updateSchema_migrationsValidator,
  filterValidator,
  schema_migrationsModel
});
const schema_migrationsService = require('../../../services/dbService')({
  model:schema_migrationsModel,
  makeSchema_migrations
});
const makeSchema_migrationsController = require('./schema_migrations');
const schema_migrationsController = makeSchema_migrationsController({
  schema_migrationsService,
  makeSchema_migrations
});
module.exports = schema_migrationsController;
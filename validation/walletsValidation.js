
const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');
    
exports.schemaKeys = joi.object({
  owner_id: joi.number().integer().allow(0),
  user_id: joi.number().integer().allow(0),
  code: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  alias: joi.string().allow(null).allow(''),
  balance: joi.number().allow(0),
  account_id: joi.number().integer().allow(0),
  other_info: joi.string().allow(null).allow(''),
  allow_minus: joi.boolean(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  with: joi.string().allow(null).allow(''),
  zone: joi.string().allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_by: joi.number().integer().allow(0),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_by: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  owner_id: joi.number().integer().allow(0),
  user_id: joi.number().integer().allow(0),
  code: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  alias: joi.string().allow(null).allow(''),
  balance: joi.number().allow(0),
  account_id: joi.number().integer().allow(0),
  other_info: joi.string().allow(null).allow(''),
  allow_minus: joi.boolean(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  with: joi.string().allow(null).allow(''),
  zone: joi.string().allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_by: joi.number().integer().allow(0),
  deleted_at: joi.date().options({ convert: true }).allow(null).allow(''),
  deleted_by: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);
let keys = ['query', 'where'];
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      owner_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      alias: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      balance: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      account_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      other_info: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      allow_minus: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      with: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      zone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      deleted_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      deleted_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      createdAt: joi.any(),
      updatedAt: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);

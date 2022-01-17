
const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');
    
exports.schemaKeys = joi.object({
  owner_id: joi.number().integer().allow(0),
  user_id: joi.number().integer().allow(0),
  bank_id: joi.number().integer().allow(0),
  number: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  with: joi.string().allow(null).allow(''),
  zone: joi.string().allow(null).allow(''),
  status: joi.number().integer().allow(0),
  amount: joi.number().allow(0),
  description: joi.string().allow(null).allow(''),
  dest_model: joi.string().allow(null).allow(''),
  dest_model_id: joi.number().integer().allow(0),
  account_owner: joi.string().allow(null).allow(''),
  account_number: joi.string().allow(null).allow(''),
  additional_info: joi.string().allow(null).allow(''),
  trx_receives_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_by: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  owner_id: joi.number().integer().allow(0),
  user_id: joi.number().integer().allow(0),
  bank_id: joi.number().integer().allow(0),
  number: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  with: joi.string().allow(null).allow(''),
  zone: joi.string().allow(null).allow(''),
  status: joi.number().integer().allow(0),
  amount: joi.number().allow(0),
  description: joi.string().allow(null).allow(''),
  dest_model: joi.string().allow(null).allow(''),
  dest_model_id: joi.number().integer().allow(0),
  account_owner: joi.string().allow(null).allow(''),
  account_number: joi.string().allow(null).allow(''),
  additional_info: joi.string().allow(null).allow(''),
  trx_receives_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  created_by: joi.number().integer().allow(0),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_by: joi.number().integer().allow(0),
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
      bank_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      with: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      zone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      dest_model: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      dest_model_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      account_owner: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      account_number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      additional_info: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      trx_receives_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      created_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_by: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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

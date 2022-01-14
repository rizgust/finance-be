
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeSchema_migrationsController ({
  schema_migrationsService,makeSchema_migrations
})
{
  const addSchema_migrations = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const schema_migrations = makeSchema_migrations(originalData, 'insertSchema_migrationsValidator');
      let createdSchema_migrations = await schema_migrationsService.createOne(schema_migrations);
      return message.successResponse({ data:createdSchema_migrations });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllSchema_migrations = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeSchema_migrations(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = schema_migrationsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = schema_migrationsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = schema_migrationsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await schema_migrationsService.findMany(query, options);
      if (result){
        return message.successResponse({ data:result });
      } else {
        return message.badRequest();
      }
              
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const getSchema_migrationsCount = async (data) => {
    try {
      if (data && data.where){
        makeSchema_migrations(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await schema_migrationsService.count(where);
      if (result){
        result = { totalRecords:result };
        return message.successResponse({ data: result });
      }
      return message.recordNotFound();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const softDeleteManySchema_migrations = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await schema_migrationsService.softDeleteMany(query,updateBody);
        return message.successResponse({ data:data });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkInsertSchema_migrations = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const schema_migrationsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeSchema_migrations(item,'insertSchema_migrationsValidator');
      });
      const results = await schema_migrationsService.createMany(schema_migrationsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateSchema_migrations = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const schema_migrations = makeSchema_migrations(data.data,'updateSchema_migrationsValidator');
        const filterData = removeEmpty(schema_migrations);
        const updatedSchema_migrationss = await schema_migrationsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedSchema_migrationss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManySchema_migrations = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await schema_migrationsService.deleteMany(query);
        return message.successResponse({ data:result });
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const softDeleteSchema_migrations = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedSchema_migrations;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedSchema_migrations = await schema_migrationsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedSchema_migrations });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateSchema_migrations = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const schema_migrations = makeSchema_migrations(data,'updateSchema_migrationsValidator');
        const filterData = removeEmpty(schema_migrations);
        let query = { id:id };
        let updatedSchema_migrations = await schema_migrationsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedSchema_migrations });
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const updateSchema_migrations = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const schema_migrations = makeSchema_migrations(data,'updateSchema_migrationsValidator');
        const filterData = removeEmpty(schema_migrations);
        let query = { id:pk };
        let updatedSchema_migrations = await schema_migrationsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedSchema_migrations });
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findSchema_migrationsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeSchema_migrations(body, 'findFilterKeys',true);
        options.attributes = body.select;
      }
      if (body && body.include && body.include.length) {
        let include = [];
        body.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = dbService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      }
      let result = await schema_migrationsService.findByPk(pk, options);
      if (result){
        return message.successResponse({ data:result });
      } else {
        return message.recordNotFound();
      }
            
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteSchema_migrations = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedSchema_migrations = '';
      deletedSchema_migrations = await schema_migrationsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedSchema_migrations });
    } catch (error) {
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const removeEmpty = (obj) => {
    Object.entries(obj).forEach(([key,value])=>{
      if (value === undefined){
        delete obj[key];
      }
    });
    return obj;
  };

  return Object.freeze({
    addSchema_migrations,
    findAllSchema_migrations,
    getSchema_migrationsCount,
    softDeleteManySchema_migrations,
    bulkInsertSchema_migrations,
    bulkUpdateSchema_migrations,
    deleteManySchema_migrations,
    softDeleteSchema_migrations,
    partialUpdateSchema_migrations,
    updateSchema_migrations,
    findSchema_migrationsByPk,
    deleteSchema_migrations
  });
}

module.exports = makeSchema_migrationsController;

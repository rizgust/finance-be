
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeJournal_detailsController ({
  journal_detailsService,makeJournal_details
})
{
  const addJournal_details = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const journal_details = makeJournal_details(originalData, 'insertJournal_detailsValidator');
      let createdJournal_details = await journal_detailsService.createOne(journal_details);
      return message.successResponse({ data:createdJournal_details });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllJournal_details = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeJournal_details(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = journal_detailsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = journal_detailsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = journal_detailsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await journal_detailsService.findMany(query, options);
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

  const getJournal_detailsCount = async (data) => {
    try {
      if (data && data.where){
        makeJournal_details(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await journal_detailsService.count(where);
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

  const softDeleteManyJournal_details = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await journal_detailsService.softDeleteMany(query,updateBody);
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

  const bulkInsertJournal_details = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const journal_detailsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeJournal_details(item,'insertJournal_detailsValidator');
      });
      const results = await journal_detailsService.createMany(journal_detailsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateJournal_details = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const journal_details = makeJournal_details(data.data,'updateJournal_detailsValidator');
        const filterData = removeEmpty(journal_details);
        const updatedJournal_detailss = await journal_detailsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedJournal_detailss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyJournal_details = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await journal_detailsService.deleteMany(query);
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

  const softDeleteJournal_details = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedJournal_details;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedJournal_details = await journal_detailsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedJournal_details });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateJournal_details = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const journal_details = makeJournal_details(data,'updateJournal_detailsValidator');
        const filterData = removeEmpty(journal_details);
        let query = { id:id };
        let updatedJournal_details = await journal_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedJournal_details });
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

  const updateJournal_details = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const journal_details = makeJournal_details(data,'updateJournal_detailsValidator');
        const filterData = removeEmpty(journal_details);
        let query = { id:pk };
        let updatedJournal_details = await journal_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedJournal_details });
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

  const findJournal_detailsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeJournal_details(body, 'findFilterKeys',true);
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
      let result = await journal_detailsService.findByPk(pk, options);
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

  const deleteJournal_details = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedJournal_details = '';
      deletedJournal_details = await journal_detailsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedJournal_details });
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
    addJournal_details,
    findAllJournal_details,
    getJournal_detailsCount,
    softDeleteManyJournal_details,
    bulkInsertJournal_details,
    bulkUpdateJournal_details,
    deleteManyJournal_details,
    softDeleteJournal_details,
    partialUpdateJournal_details,
    updateJournal_details,
    findJournal_detailsByPk,
    deleteJournal_details
  });
}

module.exports = makeJournal_detailsController;


const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeTrx_expense_detailsController ({
  trx_expense_detailsService,makeTrx_expense_details
})
{
  const addTrx_expense_details = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const trx_expense_details = makeTrx_expense_details(originalData, 'insertTrx_expense_detailsValidator');
      let createdTrx_expense_details = await trx_expense_detailsService.createOne(trx_expense_details);
      return message.successResponse({ data:createdTrx_expense_details });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllTrx_expense_details = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeTrx_expense_details(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = trx_expense_detailsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = trx_expense_detailsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = trx_expense_detailsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await trx_expense_detailsService.findMany(query, options);
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

  const getTrx_expense_detailsCount = async (data) => {
    try {
      if (data && data.where){
        makeTrx_expense_details(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await trx_expense_detailsService.count(where);
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

  const softDeleteManyTrx_expense_details = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await trx_expense_detailsService.softDeleteMany(query,updateBody);
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

  const bulkInsertTrx_expense_details = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const trx_expense_detailsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeTrx_expense_details(item,'insertTrx_expense_detailsValidator');
      });
      const results = await trx_expense_detailsService.createMany(trx_expense_detailsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateTrx_expense_details = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const trx_expense_details = makeTrx_expense_details(data.data,'updateTrx_expense_detailsValidator');
        const filterData = removeEmpty(trx_expense_details);
        const updatedTrx_expense_detailss = await trx_expense_detailsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedTrx_expense_detailss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyTrx_expense_details = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await trx_expense_detailsService.deleteMany(query);
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

  const softDeleteTrx_expense_details = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedTrx_expense_details;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedTrx_expense_details = await trx_expense_detailsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedTrx_expense_details });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateTrx_expense_details = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const trx_expense_details = makeTrx_expense_details(data,'updateTrx_expense_detailsValidator');
        const filterData = removeEmpty(trx_expense_details);
        let query = { id:id };
        let updatedTrx_expense_details = await trx_expense_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_expense_details });
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

  const updateTrx_expense_details = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const trx_expense_details = makeTrx_expense_details(data,'updateTrx_expense_detailsValidator');
        const filterData = removeEmpty(trx_expense_details);
        let query = { id:pk };
        let updatedTrx_expense_details = await trx_expense_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_expense_details });
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

  const findTrx_expense_detailsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeTrx_expense_details(body, 'findFilterKeys',true);
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
      let result = await trx_expense_detailsService.findByPk(pk, options);
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

  const deleteTrx_expense_details = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedTrx_expense_details = '';
      deletedTrx_expense_details = await trx_expense_detailsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedTrx_expense_details });
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
    addTrx_expense_details,
    findAllTrx_expense_details,
    getTrx_expense_detailsCount,
    softDeleteManyTrx_expense_details,
    bulkInsertTrx_expense_details,
    bulkUpdateTrx_expense_details,
    deleteManyTrx_expense_details,
    softDeleteTrx_expense_details,
    partialUpdateTrx_expense_details,
    updateTrx_expense_details,
    findTrx_expense_detailsByPk,
    deleteTrx_expense_details
  });
}

module.exports = makeTrx_expense_detailsController;

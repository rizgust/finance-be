
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeTrx_bank_transfersController ({
  trx_bank_transfersService,makeTrx_bank_transfers
})
{
  const addTrx_bank_transfers = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const trx_bank_transfers = makeTrx_bank_transfers(originalData, 'insertTrx_bank_transfersValidator');
      let createdTrx_bank_transfers = await trx_bank_transfersService.createOne(trx_bank_transfers);
      return message.successResponse({ data:createdTrx_bank_transfers });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllTrx_bank_transfers = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeTrx_bank_transfers(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = trx_bank_transfersService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = trx_bank_transfersService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = trx_bank_transfersService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await trx_bank_transfersService.findMany(query, options);
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

  const getTrx_bank_transfersCount = async (data) => {
    try {
      if (data && data.where){
        makeTrx_bank_transfers(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await trx_bank_transfersService.count(where);
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

  const softDeleteManyTrx_bank_transfers = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await trx_bank_transfersService.softDeleteMany(query,updateBody);
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

  const bulkInsertTrx_bank_transfers = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const trx_bank_transfersEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeTrx_bank_transfers(item,'insertTrx_bank_transfersValidator');
      });
      const results = await trx_bank_transfersService.createMany(trx_bank_transfersEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateTrx_bank_transfers = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const trx_bank_transfers = makeTrx_bank_transfers(data.data,'updateTrx_bank_transfersValidator');
        const filterData = removeEmpty(trx_bank_transfers);
        const updatedTrx_bank_transferss = await trx_bank_transfersService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedTrx_bank_transferss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyTrx_bank_transfers = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await trx_bank_transfersService.deleteMany(query);
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

  const softDeleteTrx_bank_transfers = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedTrx_bank_transfers;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedTrx_bank_transfers = await trx_bank_transfersService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedTrx_bank_transfers });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateTrx_bank_transfers = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const trx_bank_transfers = makeTrx_bank_transfers(data,'updateTrx_bank_transfersValidator');
        const filterData = removeEmpty(trx_bank_transfers);
        let query = { id:id };
        let updatedTrx_bank_transfers = await trx_bank_transfersService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_bank_transfers });
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

  const updateTrx_bank_transfers = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const trx_bank_transfers = makeTrx_bank_transfers(data,'updateTrx_bank_transfersValidator');
        const filterData = removeEmpty(trx_bank_transfers);
        let query = { id:pk };
        let updatedTrx_bank_transfers = await trx_bank_transfersService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_bank_transfers });
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

  const findTrx_bank_transfersByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeTrx_bank_transfers(body, 'findFilterKeys',true);
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
      let result = await trx_bank_transfersService.findByPk(pk, options);
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

  const deleteTrx_bank_transfers = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedTrx_bank_transfers = '';
      deletedTrx_bank_transfers = await trx_bank_transfersService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedTrx_bank_transfers });
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
    addTrx_bank_transfers,
    findAllTrx_bank_transfers,
    getTrx_bank_transfersCount,
    softDeleteManyTrx_bank_transfers,
    bulkInsertTrx_bank_transfers,
    bulkUpdateTrx_bank_transfers,
    deleteManyTrx_bank_transfers,
    softDeleteTrx_bank_transfers,
    partialUpdateTrx_bank_transfers,
    updateTrx_bank_transfers,
    findTrx_bank_transfersByPk,
    deleteTrx_bank_transfers
  });
}

module.exports = makeTrx_bank_transfersController;

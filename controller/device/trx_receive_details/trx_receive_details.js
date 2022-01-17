
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeTrx_receive_detailsController ({
  trx_receive_detailsService,makeTrx_receive_details
})
{
  const addTrx_receive_details = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const trx_receive_details = makeTrx_receive_details(originalData, 'insertTrx_receive_detailsValidator');
      let createdTrx_receive_details = await trx_receive_detailsService.createOne(trx_receive_details);
      return message.successResponse({ data:createdTrx_receive_details });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllTrx_receive_details = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeTrx_receive_details(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = trx_receive_detailsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = trx_receive_detailsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = trx_receive_detailsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await trx_receive_detailsService.findMany(query, options);
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

  const getTrx_receive_detailsCount = async (data) => {
    try {
      if (data && data.where){
        makeTrx_receive_details(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await trx_receive_detailsService.count(where);
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

  const softDeleteManyTrx_receive_details = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await trx_receive_detailsService.softDeleteMany(query,updateBody);
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

  const bulkInsertTrx_receive_details = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const trx_receive_detailsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeTrx_receive_details(item,'insertTrx_receive_detailsValidator');
      });
      const results = await trx_receive_detailsService.createMany(trx_receive_detailsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateTrx_receive_details = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const trx_receive_details = makeTrx_receive_details(data.data,'updateTrx_receive_detailsValidator');
        const filterData = removeEmpty(trx_receive_details);
        const updatedTrx_receive_detailss = await trx_receive_detailsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedTrx_receive_detailss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyTrx_receive_details = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await trx_receive_detailsService.deleteMany(query);
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

  const softDeleteTrx_receive_details = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedTrx_receive_details;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedTrx_receive_details = await trx_receive_detailsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedTrx_receive_details });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateTrx_receive_details = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const trx_receive_details = makeTrx_receive_details(data,'updateTrx_receive_detailsValidator');
        const filterData = removeEmpty(trx_receive_details);
        let query = { id:id };
        let updatedTrx_receive_details = await trx_receive_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_receive_details });
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

  const updateTrx_receive_details = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const trx_receive_details = makeTrx_receive_details(data,'updateTrx_receive_detailsValidator');
        const filterData = removeEmpty(trx_receive_details);
        let query = { id:pk };
        let updatedTrx_receive_details = await trx_receive_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_receive_details });
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

  const findTrx_receive_detailsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeTrx_receive_details(body, 'findFilterKeys',true);
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
      let result = await trx_receive_detailsService.findByPk(pk, options);
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

  const deleteTrx_receive_details = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedTrx_receive_details = '';
      deletedTrx_receive_details = await trx_receive_detailsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedTrx_receive_details });
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
    addTrx_receive_details,
    findAllTrx_receive_details,
    getTrx_receive_detailsCount,
    softDeleteManyTrx_receive_details,
    bulkInsertTrx_receive_details,
    bulkUpdateTrx_receive_details,
    deleteManyTrx_receive_details,
    softDeleteTrx_receive_details,
    partialUpdateTrx_receive_details,
    updateTrx_receive_details,
    findTrx_receive_detailsByPk,
    deleteTrx_receive_details
  });
}

module.exports = makeTrx_receive_detailsController;

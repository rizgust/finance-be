
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeTrx_receivesController ({
  trx_receivesService,makeTrx_receives
})
{
  const addTrx_receives = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const trx_receives = makeTrx_receives(originalData, 'insertTrx_receivesValidator');
      let createdTrx_receives = await trx_receivesService.createOne(trx_receives);
      return message.successResponse({ data:createdTrx_receives });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllTrx_receives = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeTrx_receives(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = trx_receivesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = trx_receivesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = trx_receivesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await trx_receivesService.findMany(query, options);
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

  const getTrx_receivesCount = async (data) => {
    try {
      if (data && data.where){
        makeTrx_receives(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await trx_receivesService.count(where);
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

  const softDeleteManyTrx_receives = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await trx_receivesService.softDeleteMany(query,updateBody);
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

  const bulkInsertTrx_receives = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const trx_receivesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeTrx_receives(item,'insertTrx_receivesValidator');
      });
      const results = await trx_receivesService.createMany(trx_receivesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateTrx_receives = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const trx_receives = makeTrx_receives(data.data,'updateTrx_receivesValidator');
        const filterData = removeEmpty(trx_receives);
        const updatedTrx_receivess = await trx_receivesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedTrx_receivess });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyTrx_receives = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await trx_receivesService.deleteMany(query);
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

  const softDeleteTrx_receives = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedTrx_receives;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedTrx_receives = await trx_receivesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedTrx_receives });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateTrx_receives = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const trx_receives = makeTrx_receives(data,'updateTrx_receivesValidator');
        const filterData = removeEmpty(trx_receives);
        let query = { id:id };
        let updatedTrx_receives = await trx_receivesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_receives });
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

  const updateTrx_receives = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const trx_receives = makeTrx_receives(data,'updateTrx_receivesValidator');
        const filterData = removeEmpty(trx_receives);
        let query = { id:pk };
        let updatedTrx_receives = await trx_receivesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_receives });
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

  const findTrx_receivesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeTrx_receives(body, 'findFilterKeys',true);
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
      let result = await trx_receivesService.findByPk(pk, options);
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

  const deleteTrx_receives = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedTrx_receives = '';
      deletedTrx_receives = await trx_receivesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedTrx_receives });
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
    addTrx_receives,
    findAllTrx_receives,
    getTrx_receivesCount,
    softDeleteManyTrx_receives,
    bulkInsertTrx_receives,
    bulkUpdateTrx_receives,
    deleteManyTrx_receives,
    softDeleteTrx_receives,
    partialUpdateTrx_receives,
    updateTrx_receives,
    findTrx_receivesByPk,
    deleteTrx_receives
  });
}

module.exports = makeTrx_receivesController;


const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeTrx_expensesController ({
  trx_expensesService,makeTrx_expenses
})
{
  const addTrx_expenses = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const trx_expenses = makeTrx_expenses(originalData, 'insertTrx_expensesValidator');
      let createdTrx_expenses = await trx_expensesService.createOne(trx_expenses);
      return message.successResponse({ data:createdTrx_expenses });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllTrx_expenses = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeTrx_expenses(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = trx_expensesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = trx_expensesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = trx_expensesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await trx_expensesService.findMany(query, options);
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

  const getTrx_expensesCount = async (data) => {
    try {
      if (data && data.where){
        makeTrx_expenses(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await trx_expensesService.count(where);
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

  const softDeleteManyTrx_expenses = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await trx_expensesService.softDeleteMany(query,updateBody);
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

  const bulkInsertTrx_expenses = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const trx_expensesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeTrx_expenses(item,'insertTrx_expensesValidator');
      });
      const results = await trx_expensesService.createMany(trx_expensesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateTrx_expenses = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const trx_expenses = makeTrx_expenses(data.data,'updateTrx_expensesValidator');
        const filterData = removeEmpty(trx_expenses);
        const updatedTrx_expensess = await trx_expensesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedTrx_expensess });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyTrx_expenses = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await trx_expensesService.deleteMany(query);
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

  const softDeleteTrx_expenses = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedTrx_expenses;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedTrx_expenses = await trx_expensesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedTrx_expenses });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateTrx_expenses = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const trx_expenses = makeTrx_expenses(data,'updateTrx_expensesValidator');
        const filterData = removeEmpty(trx_expenses);
        let query = { id:id };
        let updatedTrx_expenses = await trx_expensesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_expenses });
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

  const updateTrx_expenses = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const trx_expenses = makeTrx_expenses(data,'updateTrx_expensesValidator');
        const filterData = removeEmpty(trx_expenses);
        let query = { id:pk };
        let updatedTrx_expenses = await trx_expensesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_expenses });
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

  const findTrx_expensesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeTrx_expenses(body, 'findFilterKeys',true);
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
      let result = await trx_expensesService.findByPk(pk, options);
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

  const deleteTrx_expenses = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedTrx_expenses = '';
      deletedTrx_expenses = await trx_expensesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedTrx_expenses });
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
    addTrx_expenses,
    findAllTrx_expenses,
    getTrx_expensesCount,
    softDeleteManyTrx_expenses,
    bulkInsertTrx_expenses,
    bulkUpdateTrx_expenses,
    deleteManyTrx_expenses,
    softDeleteTrx_expenses,
    partialUpdateTrx_expenses,
    updateTrx_expenses,
    findTrx_expensesByPk,
    deleteTrx_expenses
  });
}

module.exports = makeTrx_expensesController;

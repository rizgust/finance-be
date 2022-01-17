
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeAccount_payablesController ({
  account_payablesService,makeAccount_payables
})
{
  const addAccount_payables = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const account_payables = makeAccount_payables(originalData, 'insertAccount_payablesValidator');
      let createdAccount_payables = await account_payablesService.createOne(account_payables);
      return message.successResponse({ data:createdAccount_payables });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllAccount_payables = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeAccount_payables(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = account_payablesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = account_payablesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = account_payablesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await account_payablesService.findMany(query, options);
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

  const getAccount_payablesCount = async (data) => {
    try {
      if (data && data.where){
        makeAccount_payables(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await account_payablesService.count(where);
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

  const softDeleteManyAccount_payables = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await account_payablesService.softDeleteMany(query,updateBody);
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

  const bulkInsertAccount_payables = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const account_payablesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeAccount_payables(item,'insertAccount_payablesValidator');
      });
      const results = await account_payablesService.createMany(account_payablesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateAccount_payables = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const account_payables = makeAccount_payables(data.data,'updateAccount_payablesValidator');
        const filterData = removeEmpty(account_payables);
        const updatedAccount_payabless = await account_payablesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedAccount_payabless });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyAccount_payables = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await account_payablesService.deleteMany(query);
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

  const softDeleteAccount_payables = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedAccount_payables;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedAccount_payables = await account_payablesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedAccount_payables });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateAccount_payables = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const account_payables = makeAccount_payables(data,'updateAccount_payablesValidator');
        const filterData = removeEmpty(account_payables);
        let query = { id:id };
        let updatedAccount_payables = await account_payablesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_payables });
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

  const updateAccount_payables = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const account_payables = makeAccount_payables(data,'updateAccount_payablesValidator');
        const filterData = removeEmpty(account_payables);
        let query = { id:pk };
        let updatedAccount_payables = await account_payablesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_payables });
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

  const findAccount_payablesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeAccount_payables(body, 'findFilterKeys',true);
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
      let result = await account_payablesService.findByPk(pk, options);
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

  const deleteAccount_payables = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedAccount_payables = '';
      deletedAccount_payables = await account_payablesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedAccount_payables });
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
    addAccount_payables,
    findAllAccount_payables,
    getAccount_payablesCount,
    softDeleteManyAccount_payables,
    bulkInsertAccount_payables,
    bulkUpdateAccount_payables,
    deleteManyAccount_payables,
    softDeleteAccount_payables,
    partialUpdateAccount_payables,
    updateAccount_payables,
    findAccount_payablesByPk,
    deleteAccount_payables
  });
}

module.exports = makeAccount_payablesController;

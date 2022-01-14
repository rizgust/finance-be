
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeAccount_receiveablesController ({
  account_receiveablesService,makeAccount_receiveables
})
{
  const addAccount_receiveables = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const account_receiveables = makeAccount_receiveables(originalData, 'insertAccount_receiveablesValidator');
      let createdAccount_receiveables = await account_receiveablesService.createOne(account_receiveables);
      return message.successResponse({ data:createdAccount_receiveables });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllAccount_receiveables = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeAccount_receiveables(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = account_receiveablesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = account_receiveablesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = account_receiveablesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await account_receiveablesService.findMany(query, options);
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

  const getAccount_receiveablesCount = async (data) => {
    try {
      if (data && data.where){
        makeAccount_receiveables(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await account_receiveablesService.count(where);
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

  const softDeleteManyAccount_receiveables = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await account_receiveablesService.softDeleteMany(query,updateBody);
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

  const bulkInsertAccount_receiveables = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const account_receiveablesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeAccount_receiveables(item,'insertAccount_receiveablesValidator');
      });
      const results = await account_receiveablesService.createMany(account_receiveablesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateAccount_receiveables = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const account_receiveables = makeAccount_receiveables(data.data,'updateAccount_receiveablesValidator');
        const filterData = removeEmpty(account_receiveables);
        const updatedAccount_receiveabless = await account_receiveablesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedAccount_receiveabless });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyAccount_receiveables = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await account_receiveablesService.deleteMany(query);
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

  const softDeleteAccount_receiveables = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedAccount_receiveables;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedAccount_receiveables = await account_receiveablesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedAccount_receiveables });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateAccount_receiveables = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const account_receiveables = makeAccount_receiveables(data,'updateAccount_receiveablesValidator');
        const filterData = removeEmpty(account_receiveables);
        let query = { id:id };
        let updatedAccount_receiveables = await account_receiveablesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_receiveables });
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

  const updateAccount_receiveables = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const account_receiveables = makeAccount_receiveables(data,'updateAccount_receiveablesValidator');
        const filterData = removeEmpty(account_receiveables);
        let query = { id:pk };
        let updatedAccount_receiveables = await account_receiveablesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_receiveables });
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

  const findAccount_receiveablesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeAccount_receiveables(body, 'findFilterKeys',true);
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
      let result = await account_receiveablesService.findByPk(pk, options);
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

  const deleteAccount_receiveables = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedAccount_receiveables = '';
      deletedAccount_receiveables = await account_receiveablesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedAccount_receiveables });
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
    addAccount_receiveables,
    findAllAccount_receiveables,
    getAccount_receiveablesCount,
    softDeleteManyAccount_receiveables,
    bulkInsertAccount_receiveables,
    bulkUpdateAccount_receiveables,
    deleteManyAccount_receiveables,
    softDeleteAccount_receiveables,
    partialUpdateAccount_receiveables,
    updateAccount_receiveables,
    findAccount_receiveablesByPk,
    deleteAccount_receiveables
  });
}

module.exports = makeAccount_receiveablesController;

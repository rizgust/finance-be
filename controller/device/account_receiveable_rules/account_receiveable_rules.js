
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeAccount_receiveable_rulesController ({
  account_receiveable_rulesService,makeAccount_receiveable_rules
})
{
  const addAccount_receiveable_rules = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const account_receiveable_rules = makeAccount_receiveable_rules(originalData, 'insertAccount_receiveable_rulesValidator');
      let createdAccount_receiveable_rules = await account_receiveable_rulesService.createOne(account_receiveable_rules);
      return message.successResponse({ data:createdAccount_receiveable_rules });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllAccount_receiveable_rules = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeAccount_receiveable_rules(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = account_receiveable_rulesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = account_receiveable_rulesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = account_receiveable_rulesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await account_receiveable_rulesService.findMany(query, options);
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

  const getAccount_receiveable_rulesCount = async (data) => {
    try {
      if (data && data.where){
        makeAccount_receiveable_rules(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await account_receiveable_rulesService.count(where);
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

  const softDeleteManyAccount_receiveable_rules = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await account_receiveable_rulesService.softDeleteMany(query,updateBody);
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

  const bulkInsertAccount_receiveable_rules = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const account_receiveable_rulesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeAccount_receiveable_rules(item,'insertAccount_receiveable_rulesValidator');
      });
      const results = await account_receiveable_rulesService.createMany(account_receiveable_rulesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateAccount_receiveable_rules = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const account_receiveable_rules = makeAccount_receiveable_rules(data.data,'updateAccount_receiveable_rulesValidator');
        const filterData = removeEmpty(account_receiveable_rules);
        const updatedAccount_receiveable_ruless = await account_receiveable_rulesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedAccount_receiveable_ruless });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyAccount_receiveable_rules = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await account_receiveable_rulesService.deleteMany(query);
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

  const softDeleteAccount_receiveable_rules = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedAccount_receiveable_rules;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedAccount_receiveable_rules = await account_receiveable_rulesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedAccount_receiveable_rules });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateAccount_receiveable_rules = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const account_receiveable_rules = makeAccount_receiveable_rules(data,'updateAccount_receiveable_rulesValidator');
        const filterData = removeEmpty(account_receiveable_rules);
        let query = { id:id };
        let updatedAccount_receiveable_rules = await account_receiveable_rulesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_receiveable_rules });
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

  const updateAccount_receiveable_rules = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const account_receiveable_rules = makeAccount_receiveable_rules(data,'updateAccount_receiveable_rulesValidator');
        const filterData = removeEmpty(account_receiveable_rules);
        let query = { id:pk };
        let updatedAccount_receiveable_rules = await account_receiveable_rulesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_receiveable_rules });
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

  const findAccount_receiveable_rulesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeAccount_receiveable_rules(body, 'findFilterKeys',true);
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
      let result = await account_receiveable_rulesService.findByPk(pk, options);
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

  const deleteAccount_receiveable_rules = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedAccount_receiveable_rules = '';
      deletedAccount_receiveable_rules = await account_receiveable_rulesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedAccount_receiveable_rules });
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
    addAccount_receiveable_rules,
    findAllAccount_receiveable_rules,
    getAccount_receiveable_rulesCount,
    softDeleteManyAccount_receiveable_rules,
    bulkInsertAccount_receiveable_rules,
    bulkUpdateAccount_receiveable_rules,
    deleteManyAccount_receiveable_rules,
    softDeleteAccount_receiveable_rules,
    partialUpdateAccount_receiveable_rules,
    updateAccount_receiveable_rules,
    findAccount_receiveable_rulesByPk,
    deleteAccount_receiveable_rules
  });
}

module.exports = makeAccount_receiveable_rulesController;

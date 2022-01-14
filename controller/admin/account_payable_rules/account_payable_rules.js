
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeAccount_payable_rulesController ({
  account_payable_rulesService,makeAccount_payable_rules
})
{
  const addAccount_payable_rules = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const account_payable_rules = makeAccount_payable_rules(originalData, 'insertAccount_payable_rulesValidator');
      let createdAccount_payable_rules = await account_payable_rulesService.createOne(account_payable_rules);
      return message.successResponse({ data:createdAccount_payable_rules });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllAccount_payable_rules = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeAccount_payable_rules(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = account_payable_rulesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = account_payable_rulesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = account_payable_rulesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await account_payable_rulesService.findMany(query, options);
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

  const getAccount_payable_rulesCount = async (data) => {
    try {
      if (data && data.where){
        makeAccount_payable_rules(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await account_payable_rulesService.count(where);
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

  const softDeleteManyAccount_payable_rules = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await account_payable_rulesService.softDeleteMany(query,updateBody);
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

  const bulkInsertAccount_payable_rules = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const account_payable_rulesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeAccount_payable_rules(item,'insertAccount_payable_rulesValidator');
      });
      const results = await account_payable_rulesService.createMany(account_payable_rulesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateAccount_payable_rules = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const account_payable_rules = makeAccount_payable_rules(data.data,'updateAccount_payable_rulesValidator');
        const filterData = removeEmpty(account_payable_rules);
        const updatedAccount_payable_ruless = await account_payable_rulesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedAccount_payable_ruless });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyAccount_payable_rules = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await account_payable_rulesService.deleteMany(query);
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

  const softDeleteAccount_payable_rules = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedAccount_payable_rules;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedAccount_payable_rules = await account_payable_rulesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedAccount_payable_rules });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateAccount_payable_rules = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const account_payable_rules = makeAccount_payable_rules(data,'updateAccount_payable_rulesValidator');
        const filterData = removeEmpty(account_payable_rules);
        let query = { id:id };
        let updatedAccount_payable_rules = await account_payable_rulesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_payable_rules });
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

  const updateAccount_payable_rules = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const account_payable_rules = makeAccount_payable_rules(data,'updateAccount_payable_rulesValidator');
        const filterData = removeEmpty(account_payable_rules);
        let query = { id:pk };
        let updatedAccount_payable_rules = await account_payable_rulesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedAccount_payable_rules });
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

  const findAccount_payable_rulesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeAccount_payable_rules(body, 'findFilterKeys',true);
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
      let result = await account_payable_rulesService.findByPk(pk, options);
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

  const deleteAccount_payable_rules = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedAccount_payable_rules = '';
      deletedAccount_payable_rules = await account_payable_rulesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedAccount_payable_rules });
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
    addAccount_payable_rules,
    findAllAccount_payable_rules,
    getAccount_payable_rulesCount,
    softDeleteManyAccount_payable_rules,
    bulkInsertAccount_payable_rules,
    bulkUpdateAccount_payable_rules,
    deleteManyAccount_payable_rules,
    softDeleteAccount_payable_rules,
    partialUpdateAccount_payable_rules,
    updateAccount_payable_rules,
    findAccount_payable_rulesByPk,
    deleteAccount_payable_rules
  });
}

module.exports = makeAccount_payable_rulesController;

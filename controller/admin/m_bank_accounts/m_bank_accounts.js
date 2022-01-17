
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeM_bank_accountsController ({
  m_bank_accountsService,makeM_bank_accounts
})
{
  const addM_bank_accounts = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const m_bank_accounts = makeM_bank_accounts(originalData, 'insertM_bank_accountsValidator');
      let createdM_bank_accounts = await m_bank_accountsService.createOne(m_bank_accounts);
      return message.successResponse({ data:createdM_bank_accounts });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllM_bank_accounts = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeM_bank_accounts(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = m_bank_accountsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = m_bank_accountsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = m_bank_accountsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await m_bank_accountsService.findMany(query, options);
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

  const getM_bank_accountsCount = async (data) => {
    try {
      if (data && data.where){
        makeM_bank_accounts(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await m_bank_accountsService.count(where);
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

  const softDeleteManyM_bank_accounts = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await m_bank_accountsService.softDeleteMany(query,updateBody);
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

  const bulkInsertM_bank_accounts = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const m_bank_accountsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeM_bank_accounts(item,'insertM_bank_accountsValidator');
      });
      const results = await m_bank_accountsService.createMany(m_bank_accountsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateM_bank_accounts = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const m_bank_accounts = makeM_bank_accounts(data.data,'updateM_bank_accountsValidator');
        const filterData = removeEmpty(m_bank_accounts);
        const updatedM_bank_accountss = await m_bank_accountsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedM_bank_accountss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyM_bank_accounts = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await m_bank_accountsService.deleteMany(query);
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

  const softDeleteM_bank_accounts = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedM_bank_accounts;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedM_bank_accounts = await m_bank_accountsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedM_bank_accounts });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateM_bank_accounts = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const m_bank_accounts = makeM_bank_accounts(data,'updateM_bank_accountsValidator');
        const filterData = removeEmpty(m_bank_accounts);
        let query = { id:id };
        let updatedM_bank_accounts = await m_bank_accountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_bank_accounts });
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

  const updateM_bank_accounts = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const m_bank_accounts = makeM_bank_accounts(data,'updateM_bank_accountsValidator');
        const filterData = removeEmpty(m_bank_accounts);
        let query = { id:pk };
        let updatedM_bank_accounts = await m_bank_accountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_bank_accounts });
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

  const findM_bank_accountsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeM_bank_accounts(body, 'findFilterKeys',true);
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
      let result = await m_bank_accountsService.findByPk(pk, options);
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

  const deleteM_bank_accounts = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedM_bank_accounts = '';
      deletedM_bank_accounts = await m_bank_accountsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedM_bank_accounts });
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
    addM_bank_accounts,
    findAllM_bank_accounts,
    getM_bank_accountsCount,
    softDeleteManyM_bank_accounts,
    bulkInsertM_bank_accounts,
    bulkUpdateM_bank_accounts,
    deleteManyM_bank_accounts,
    softDeleteM_bank_accounts,
    partialUpdateM_bank_accounts,
    updateM_bank_accounts,
    findM_bank_accountsByPk,
    deleteM_bank_accounts
  });
}

module.exports = makeM_bank_accountsController;

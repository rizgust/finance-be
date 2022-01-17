
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeM_virtual_accountsController ({
  m_virtual_accountsService,makeM_virtual_accounts
})
{
  const addM_virtual_accounts = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const m_virtual_accounts = makeM_virtual_accounts(originalData, 'insertM_virtual_accountsValidator');
      let createdM_virtual_accounts = await m_virtual_accountsService.createOne(m_virtual_accounts);
      return message.successResponse({ data:createdM_virtual_accounts });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllM_virtual_accounts = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeM_virtual_accounts(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = m_virtual_accountsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = m_virtual_accountsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = m_virtual_accountsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await m_virtual_accountsService.findMany(query, options);
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

  const getM_virtual_accountsCount = async (data) => {
    try {
      if (data && data.where){
        makeM_virtual_accounts(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await m_virtual_accountsService.count(where);
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

  const softDeleteManyM_virtual_accounts = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await m_virtual_accountsService.softDeleteMany(query,updateBody);
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

  const bulkInsertM_virtual_accounts = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const m_virtual_accountsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeM_virtual_accounts(item,'insertM_virtual_accountsValidator');
      });
      const results = await m_virtual_accountsService.createMany(m_virtual_accountsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateM_virtual_accounts = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const m_virtual_accounts = makeM_virtual_accounts(data.data,'updateM_virtual_accountsValidator');
        const filterData = removeEmpty(m_virtual_accounts);
        const updatedM_virtual_accountss = await m_virtual_accountsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedM_virtual_accountss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyM_virtual_accounts = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await m_virtual_accountsService.deleteMany(query);
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

  const softDeleteM_virtual_accounts = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedM_virtual_accounts;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedM_virtual_accounts = await m_virtual_accountsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedM_virtual_accounts });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateM_virtual_accounts = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const m_virtual_accounts = makeM_virtual_accounts(data,'updateM_virtual_accountsValidator');
        const filterData = removeEmpty(m_virtual_accounts);
        let query = { id:id };
        let updatedM_virtual_accounts = await m_virtual_accountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_virtual_accounts });
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

  const updateM_virtual_accounts = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const m_virtual_accounts = makeM_virtual_accounts(data,'updateM_virtual_accountsValidator');
        const filterData = removeEmpty(m_virtual_accounts);
        let query = { id:pk };
        let updatedM_virtual_accounts = await m_virtual_accountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_virtual_accounts });
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

  const findM_virtual_accountsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeM_virtual_accounts(body, 'findFilterKeys',true);
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
      let result = await m_virtual_accountsService.findByPk(pk, options);
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

  const deleteM_virtual_accounts = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedM_virtual_accounts = '';
      deletedM_virtual_accounts = await m_virtual_accountsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedM_virtual_accounts });
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
    addM_virtual_accounts,
    findAllM_virtual_accounts,
    getM_virtual_accountsCount,
    softDeleteManyM_virtual_accounts,
    bulkInsertM_virtual_accounts,
    bulkUpdateM_virtual_accounts,
    deleteManyM_virtual_accounts,
    softDeleteM_virtual_accounts,
    partialUpdateM_virtual_accounts,
    updateM_virtual_accounts,
    findM_virtual_accountsByPk,
    deleteM_virtual_accounts
  });
}

module.exports = makeM_virtual_accountsController;

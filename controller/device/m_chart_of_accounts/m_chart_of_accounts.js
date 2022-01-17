
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeM_chart_of_accountsController ({
  m_chart_of_accountsService,makeM_chart_of_accounts
})
{
  const addM_chart_of_accounts = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const m_chart_of_accounts = makeM_chart_of_accounts(originalData, 'insertM_chart_of_accountsValidator');
      let createdM_chart_of_accounts = await m_chart_of_accountsService.createOne(m_chart_of_accounts);
      return message.successResponse({ data:createdM_chart_of_accounts });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllM_chart_of_accounts = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeM_chart_of_accounts(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = m_chart_of_accountsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = m_chart_of_accountsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = m_chart_of_accountsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await m_chart_of_accountsService.findMany(query, options);
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

  const getM_chart_of_accountsCount = async (data) => {
    try {
      if (data && data.where){
        makeM_chart_of_accounts(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await m_chart_of_accountsService.count(where);
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

  const softDeleteManyM_chart_of_accounts = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await m_chart_of_accountsService.softDeleteMany(query,updateBody);
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

  const bulkInsertM_chart_of_accounts = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const m_chart_of_accountsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeM_chart_of_accounts(item,'insertM_chart_of_accountsValidator');
      });
      const results = await m_chart_of_accountsService.createMany(m_chart_of_accountsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateM_chart_of_accounts = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const m_chart_of_accounts = makeM_chart_of_accounts(data.data,'updateM_chart_of_accountsValidator');
        const filterData = removeEmpty(m_chart_of_accounts);
        const updatedM_chart_of_accountss = await m_chart_of_accountsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedM_chart_of_accountss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyM_chart_of_accounts = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await m_chart_of_accountsService.deleteMany(query);
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

  const softDeleteM_chart_of_accounts = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedM_chart_of_accounts;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedM_chart_of_accounts = await m_chart_of_accountsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedM_chart_of_accounts });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateM_chart_of_accounts = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const m_chart_of_accounts = makeM_chart_of_accounts(data,'updateM_chart_of_accountsValidator');
        const filterData = removeEmpty(m_chart_of_accounts);
        let query = { id:id };
        let updatedM_chart_of_accounts = await m_chart_of_accountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_chart_of_accounts });
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

  const updateM_chart_of_accounts = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const m_chart_of_accounts = makeM_chart_of_accounts(data,'updateM_chart_of_accountsValidator');
        const filterData = removeEmpty(m_chart_of_accounts);
        let query = { id:pk };
        let updatedM_chart_of_accounts = await m_chart_of_accountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_chart_of_accounts });
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

  const findM_chart_of_accountsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeM_chart_of_accounts(body, 'findFilterKeys',true);
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
      let result = await m_chart_of_accountsService.findByPk(pk, options);
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

  const deleteM_chart_of_accounts = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedM_chart_of_accounts = '';
      deletedM_chart_of_accounts = await m_chart_of_accountsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedM_chart_of_accounts });
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
    addM_chart_of_accounts,
    findAllM_chart_of_accounts,
    getM_chart_of_accountsCount,
    softDeleteManyM_chart_of_accounts,
    bulkInsertM_chart_of_accounts,
    bulkUpdateM_chart_of_accounts,
    deleteManyM_chart_of_accounts,
    softDeleteM_chart_of_accounts,
    partialUpdateM_chart_of_accounts,
    updateM_chart_of_accounts,
    findM_chart_of_accountsByPk,
    deleteM_chart_of_accounts
  });
}

module.exports = makeM_chart_of_accountsController;

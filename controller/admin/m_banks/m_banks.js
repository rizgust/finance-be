
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeM_banksController ({
  m_banksService,makeM_banks
})
{
  const addM_banks = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const m_banks = makeM_banks(originalData, 'insertM_banksValidator');
      let createdM_banks = await m_banksService.createOne(m_banks);
      return message.successResponse({ data:createdM_banks });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllM_banks = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeM_banks(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = m_banksService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = m_banksService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = m_banksService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await m_banksService.findMany(query, options);
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

  const getM_banksCount = async (data) => {
    try {
      if (data && data.where){
        makeM_banks(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await m_banksService.count(where);
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

  const softDeleteManyM_banks = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await m_banksService.softDeleteMany(query,updateBody);
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

  const bulkInsertM_banks = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const m_banksEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeM_banks(item,'insertM_banksValidator');
      });
      const results = await m_banksService.createMany(m_banksEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateM_banks = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const m_banks = makeM_banks(data.data,'updateM_banksValidator');
        const filterData = removeEmpty(m_banks);
        const updatedM_bankss = await m_banksService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedM_bankss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyM_banks = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await m_banksService.deleteMany(query);
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

  const softDeleteM_banks = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedM_banks;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedM_banks = await m_banksService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedM_banks });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateM_banks = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const m_banks = makeM_banks(data,'updateM_banksValidator');
        const filterData = removeEmpty(m_banks);
        let query = { id:id };
        let updatedM_banks = await m_banksService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_banks });
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

  const updateM_banks = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const m_banks = makeM_banks(data,'updateM_banksValidator');
        const filterData = removeEmpty(m_banks);
        let query = { id:pk };
        let updatedM_banks = await m_banksService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_banks });
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

  const findM_banksByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeM_banks(body, 'findFilterKeys',true);
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
      let result = await m_banksService.findByPk(pk, options);
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

  const deleteM_banks = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedM_banks = '';
      deletedM_banks = await m_banksService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedM_banks });
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
    addM_banks,
    findAllM_banks,
    getM_banksCount,
    softDeleteManyM_banks,
    bulkInsertM_banks,
    bulkUpdateM_banks,
    deleteManyM_banks,
    softDeleteM_banks,
    partialUpdateM_banks,
    updateM_banks,
    findM_banksByPk,
    deleteM_banks
  });
}

module.exports = makeM_banksController;

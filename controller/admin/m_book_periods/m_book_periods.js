
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeM_book_periodsController ({
  m_book_periodsService,makeM_book_periods
})
{
  const addM_book_periods = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const m_book_periods = makeM_book_periods(originalData, 'insertM_book_periodsValidator');
      let createdM_book_periods = await m_book_periodsService.createOne(m_book_periods);
      return message.successResponse({ data:createdM_book_periods });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllM_book_periods = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeM_book_periods(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = m_book_periodsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = m_book_periodsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = m_book_periodsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await m_book_periodsService.findMany(query, options);
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

  const getM_book_periodsCount = async (data) => {
    try {
      if (data && data.where){
        makeM_book_periods(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await m_book_periodsService.count(where);
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

  const softDeleteManyM_book_periods = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await m_book_periodsService.softDeleteMany(query,updateBody);
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

  const bulkInsertM_book_periods = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const m_book_periodsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeM_book_periods(item,'insertM_book_periodsValidator');
      });
      const results = await m_book_periodsService.createMany(m_book_periodsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateM_book_periods = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const m_book_periods = makeM_book_periods(data.data,'updateM_book_periodsValidator');
        const filterData = removeEmpty(m_book_periods);
        const updatedM_book_periodss = await m_book_periodsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedM_book_periodss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyM_book_periods = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await m_book_periodsService.deleteMany(query);
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

  const softDeleteM_book_periods = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedM_book_periods;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedM_book_periods = await m_book_periodsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedM_book_periods });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateM_book_periods = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const m_book_periods = makeM_book_periods(data,'updateM_book_periodsValidator');
        const filterData = removeEmpty(m_book_periods);
        let query = { id:id };
        let updatedM_book_periods = await m_book_periodsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_book_periods });
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

  const updateM_book_periods = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const m_book_periods = makeM_book_periods(data,'updateM_book_periodsValidator');
        const filterData = removeEmpty(m_book_periods);
        let query = { id:pk };
        let updatedM_book_periods = await m_book_periodsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_book_periods });
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

  const findM_book_periodsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeM_book_periods(body, 'findFilterKeys',true);
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
      let result = await m_book_periodsService.findByPk(pk, options);
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

  const deleteM_book_periods = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedM_book_periods = '';
      deletedM_book_periods = await m_book_periodsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedM_book_periods });
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
    addM_book_periods,
    findAllM_book_periods,
    getM_book_periodsCount,
    softDeleteManyM_book_periods,
    bulkInsertM_book_periods,
    bulkUpdateM_book_periods,
    deleteManyM_book_periods,
    softDeleteM_book_periods,
    partialUpdateM_book_periods,
    updateM_book_periods,
    findM_book_periodsByPk,
    deleteM_book_periods
  });
}

module.exports = makeM_book_periodsController;

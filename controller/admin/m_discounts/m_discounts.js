
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeM_discountsController ({
  m_discountsService,makeM_discounts
})
{
  const addM_discounts = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const m_discounts = makeM_discounts(originalData, 'insertM_discountsValidator');
      let createdM_discounts = await m_discountsService.createOne(m_discounts);
      return message.successResponse({ data:createdM_discounts });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllM_discounts = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeM_discounts(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = m_discountsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = m_discountsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = m_discountsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await m_discountsService.findMany(query, options);
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

  const getM_discountsCount = async (data) => {
    try {
      if (data && data.where){
        makeM_discounts(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await m_discountsService.count(where);
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

  const softDeleteManyM_discounts = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await m_discountsService.softDeleteMany(query,updateBody);
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

  const bulkInsertM_discounts = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const m_discountsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeM_discounts(item,'insertM_discountsValidator');
      });
      const results = await m_discountsService.createMany(m_discountsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateM_discounts = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const m_discounts = makeM_discounts(data.data,'updateM_discountsValidator');
        const filterData = removeEmpty(m_discounts);
        const updatedM_discountss = await m_discountsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedM_discountss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyM_discounts = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await m_discountsService.deleteMany(query);
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

  const softDeleteM_discounts = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedM_discounts;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedM_discounts = await m_discountsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedM_discounts });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateM_discounts = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const m_discounts = makeM_discounts(data,'updateM_discountsValidator');
        const filterData = removeEmpty(m_discounts);
        let query = { id:id };
        let updatedM_discounts = await m_discountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_discounts });
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

  const updateM_discounts = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const m_discounts = makeM_discounts(data,'updateM_discountsValidator');
        const filterData = removeEmpty(m_discounts);
        let query = { id:pk };
        let updatedM_discounts = await m_discountsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedM_discounts });
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

  const findM_discountsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeM_discounts(body, 'findFilterKeys',true);
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
      let result = await m_discountsService.findByPk(pk, options);
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

  const deleteM_discounts = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedM_discounts = '';
      deletedM_discounts = await m_discountsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedM_discounts });
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
    addM_discounts,
    findAllM_discounts,
    getM_discountsCount,
    softDeleteManyM_discounts,
    bulkInsertM_discounts,
    bulkUpdateM_discounts,
    deleteManyM_discounts,
    softDeleteM_discounts,
    partialUpdateM_discounts,
    updateM_discounts,
    findM_discountsByPk,
    deleteM_discounts
  });
}

module.exports = makeM_discountsController;

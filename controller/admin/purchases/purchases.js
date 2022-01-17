
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makePurchasesController ({
  purchasesService,makePurchases
})
{
  const addPurchases = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const purchases = makePurchases(originalData, 'insertPurchasesValidator');
      let createdPurchases = await purchasesService.createOne(purchases);
      return message.successResponse({ data:createdPurchases });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllPurchases = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makePurchases(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = purchasesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = purchasesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = purchasesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await purchasesService.findMany(query, options);
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

  const getPurchasesCount = async (data) => {
    try {
      if (data && data.where){
        makePurchases(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await purchasesService.count(where);
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

  const softDeleteManyPurchases = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await purchasesService.softDeleteMany(query,updateBody);
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

  const bulkInsertPurchases = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const purchasesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makePurchases(item,'insertPurchasesValidator');
      });
      const results = await purchasesService.createMany(purchasesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdatePurchases = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const purchases = makePurchases(data.data,'updatePurchasesValidator');
        const filterData = removeEmpty(purchases);
        const updatedPurchasess = await purchasesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedPurchasess });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyPurchases = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await purchasesService.deleteMany(query);
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

  const softDeletePurchases = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedPurchases;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedPurchases = await purchasesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedPurchases });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdatePurchases = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const purchases = makePurchases(data,'updatePurchasesValidator');
        const filterData = removeEmpty(purchases);
        let query = { id:id };
        let updatedPurchases = await purchasesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedPurchases });
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

  const updatePurchases = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const purchases = makePurchases(data,'updatePurchasesValidator');
        const filterData = removeEmpty(purchases);
        let query = { id:pk };
        let updatedPurchases = await purchasesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedPurchases });
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

  const findPurchasesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makePurchases(body, 'findFilterKeys',true);
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
      let result = await purchasesService.findByPk(pk, options);
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

  const deletePurchases = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedPurchases = '';
      deletedPurchases = await purchasesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedPurchases });
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
    addPurchases,
    findAllPurchases,
    getPurchasesCount,
    softDeleteManyPurchases,
    bulkInsertPurchases,
    bulkUpdatePurchases,
    deleteManyPurchases,
    softDeletePurchases,
    partialUpdatePurchases,
    updatePurchases,
    findPurchasesByPk,
    deletePurchases
  });
}

module.exports = makePurchasesController;

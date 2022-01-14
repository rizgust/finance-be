
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeTrx_walletsController ({
  trx_walletsService,makeTrx_wallets
})
{
  const addTrx_wallets = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const trx_wallets = makeTrx_wallets(originalData, 'insertTrx_walletsValidator');
      let createdTrx_wallets = await trx_walletsService.createOne(trx_wallets);
      return message.successResponse({ data:createdTrx_wallets });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllTrx_wallets = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeTrx_wallets(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = trx_walletsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = trx_walletsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = trx_walletsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await trx_walletsService.findMany(query, options);
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

  const getTrx_walletsCount = async (data) => {
    try {
      if (data && data.where){
        makeTrx_wallets(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await trx_walletsService.count(where);
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

  const softDeleteManyTrx_wallets = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await trx_walletsService.softDeleteMany(query,updateBody);
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

  const bulkInsertTrx_wallets = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const trx_walletsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeTrx_wallets(item,'insertTrx_walletsValidator');
      });
      const results = await trx_walletsService.createMany(trx_walletsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateTrx_wallets = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const trx_wallets = makeTrx_wallets(data.data,'updateTrx_walletsValidator');
        const filterData = removeEmpty(trx_wallets);
        const updatedTrx_walletss = await trx_walletsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedTrx_walletss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyTrx_wallets = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await trx_walletsService.deleteMany(query);
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

  const softDeleteTrx_wallets = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedTrx_wallets;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedTrx_wallets = await trx_walletsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedTrx_wallets });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateTrx_wallets = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const trx_wallets = makeTrx_wallets(data,'updateTrx_walletsValidator');
        const filterData = removeEmpty(trx_wallets);
        let query = { id:id };
        let updatedTrx_wallets = await trx_walletsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_wallets });
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

  const updateTrx_wallets = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const trx_wallets = makeTrx_wallets(data,'updateTrx_walletsValidator');
        const filterData = removeEmpty(trx_wallets);
        let query = { id:pk };
        let updatedTrx_wallets = await trx_walletsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedTrx_wallets });
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

  const findTrx_walletsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeTrx_wallets(body, 'findFilterKeys',true);
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
      let result = await trx_walletsService.findByPk(pk, options);
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

  const deleteTrx_wallets = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedTrx_wallets = '';
      deletedTrx_wallets = await trx_walletsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedTrx_wallets });
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
    addTrx_wallets,
    findAllTrx_wallets,
    getTrx_walletsCount,
    softDeleteManyTrx_wallets,
    bulkInsertTrx_wallets,
    bulkUpdateTrx_wallets,
    deleteManyTrx_wallets,
    softDeleteTrx_wallets,
    partialUpdateTrx_wallets,
    updateTrx_wallets,
    findTrx_walletsByPk,
    deleteTrx_wallets
  });
}

module.exports = makeTrx_walletsController;

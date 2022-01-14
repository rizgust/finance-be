
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeGeneral_ledgersController ({
  general_ledgersService,makeGeneral_ledgers
})
{
  const addGeneral_ledgers = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const general_ledgers = makeGeneral_ledgers(originalData, 'insertGeneral_ledgersValidator');
      let createdGeneral_ledgers = await general_ledgersService.createOne(general_ledgers);
      return message.successResponse({ data:createdGeneral_ledgers });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllGeneral_ledgers = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeGeneral_ledgers(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = general_ledgersService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = general_ledgersService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = general_ledgersService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await general_ledgersService.findMany(query, options);
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

  const getGeneral_ledgersCount = async (data) => {
    try {
      if (data && data.where){
        makeGeneral_ledgers(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await general_ledgersService.count(where);
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

  const softDeleteManyGeneral_ledgers = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await general_ledgersService.softDeleteMany(query,updateBody);
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

  const bulkInsertGeneral_ledgers = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const general_ledgersEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeGeneral_ledgers(item,'insertGeneral_ledgersValidator');
      });
      const results = await general_ledgersService.createMany(general_ledgersEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateGeneral_ledgers = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const general_ledgers = makeGeneral_ledgers(data.data,'updateGeneral_ledgersValidator');
        const filterData = removeEmpty(general_ledgers);
        const updatedGeneral_ledgerss = await general_ledgersService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedGeneral_ledgerss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyGeneral_ledgers = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await general_ledgersService.deleteMany(query);
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

  const softDeleteGeneral_ledgers = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedGeneral_ledgers;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedGeneral_ledgers = await general_ledgersService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedGeneral_ledgers });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateGeneral_ledgers = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const general_ledgers = makeGeneral_ledgers(data,'updateGeneral_ledgersValidator');
        const filterData = removeEmpty(general_ledgers);
        let query = { id:id };
        let updatedGeneral_ledgers = await general_ledgersService.updateMany(query,filterData);
        return message.successResponse({ data:updatedGeneral_ledgers });
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

  const updateGeneral_ledgers = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const general_ledgers = makeGeneral_ledgers(data,'updateGeneral_ledgersValidator');
        const filterData = removeEmpty(general_ledgers);
        let query = { id:pk };
        let updatedGeneral_ledgers = await general_ledgersService.updateMany(query,filterData);
        return message.successResponse({ data:updatedGeneral_ledgers });
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

  const findGeneral_ledgersByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeGeneral_ledgers(body, 'findFilterKeys',true);
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
      let result = await general_ledgersService.findByPk(pk, options);
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

  const deleteGeneral_ledgers = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedGeneral_ledgers = '';
      deletedGeneral_ledgers = await general_ledgersService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedGeneral_ledgers });
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
    addGeneral_ledgers,
    findAllGeneral_ledgers,
    getGeneral_ledgersCount,
    softDeleteManyGeneral_ledgers,
    bulkInsertGeneral_ledgers,
    bulkUpdateGeneral_ledgers,
    deleteManyGeneral_ledgers,
    softDeleteGeneral_ledgers,
    partialUpdateGeneral_ledgers,
    updateGeneral_ledgers,
    findGeneral_ledgersByPk,
    deleteGeneral_ledgers
  });
}

module.exports = makeGeneral_ledgersController;

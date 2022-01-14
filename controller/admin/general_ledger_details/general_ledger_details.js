
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeGeneral_ledger_detailsController ({
  general_ledger_detailsService,makeGeneral_ledger_details
})
{
  const addGeneral_ledger_details = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const general_ledger_details = makeGeneral_ledger_details(originalData, 'insertGeneral_ledger_detailsValidator');
      let createdGeneral_ledger_details = await general_ledger_detailsService.createOne(general_ledger_details);
      return message.successResponse({ data:createdGeneral_ledger_details });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllGeneral_ledger_details = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeGeneral_ledger_details(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = general_ledger_detailsService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = general_ledger_detailsService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = general_ledger_detailsService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await general_ledger_detailsService.findMany(query, options);
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

  const getGeneral_ledger_detailsCount = async (data) => {
    try {
      if (data && data.where){
        makeGeneral_ledger_details(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await general_ledger_detailsService.count(where);
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

  const softDeleteManyGeneral_ledger_details = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await general_ledger_detailsService.softDeleteMany(query,updateBody);
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

  const bulkInsertGeneral_ledger_details = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const general_ledger_detailsEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeGeneral_ledger_details(item,'insertGeneral_ledger_detailsValidator');
      });
      const results = await general_ledger_detailsService.createMany(general_ledger_detailsEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateGeneral_ledger_details = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const general_ledger_details = makeGeneral_ledger_details(data.data,'updateGeneral_ledger_detailsValidator');
        const filterData = removeEmpty(general_ledger_details);
        const updatedGeneral_ledger_detailss = await general_ledger_detailsService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedGeneral_ledger_detailss });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyGeneral_ledger_details = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await general_ledger_detailsService.deleteMany(query);
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

  const softDeleteGeneral_ledger_details = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedGeneral_ledger_details;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedGeneral_ledger_details = await general_ledger_detailsService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedGeneral_ledger_details });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateGeneral_ledger_details = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const general_ledger_details = makeGeneral_ledger_details(data,'updateGeneral_ledger_detailsValidator');
        const filterData = removeEmpty(general_ledger_details);
        let query = { id:id };
        let updatedGeneral_ledger_details = await general_ledger_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedGeneral_ledger_details });
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

  const updateGeneral_ledger_details = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const general_ledger_details = makeGeneral_ledger_details(data,'updateGeneral_ledger_detailsValidator');
        const filterData = removeEmpty(general_ledger_details);
        let query = { id:pk };
        let updatedGeneral_ledger_details = await general_ledger_detailsService.updateMany(query,filterData);
        return message.successResponse({ data:updatedGeneral_ledger_details });
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

  const findGeneral_ledger_detailsByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeGeneral_ledger_details(body, 'findFilterKeys',true);
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
      let result = await general_ledger_detailsService.findByPk(pk, options);
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

  const deleteGeneral_ledger_details = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedGeneral_ledger_details = '';
      deletedGeneral_ledger_details = await general_ledger_detailsService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedGeneral_ledger_details });
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
    addGeneral_ledger_details,
    findAllGeneral_ledger_details,
    getGeneral_ledger_detailsCount,
    softDeleteManyGeneral_ledger_details,
    bulkInsertGeneral_ledger_details,
    bulkUpdateGeneral_ledger_details,
    deleteManyGeneral_ledger_details,
    softDeleteGeneral_ledger_details,
    partialUpdateGeneral_ledger_details,
    updateGeneral_ledger_details,
    findGeneral_ledger_detailsByPk,
    deleteGeneral_ledger_details
  });
}

module.exports = makeGeneral_ledger_detailsController;


const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeInvoicesController ({
  invoicesService,makeInvoices
})
{
  const addInvoices = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const invoices = makeInvoices(originalData, 'insertInvoicesValidator');
      let createdInvoices = await invoicesService.createOne(invoices);
      return message.successResponse({ data:createdInvoices });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllInvoices = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeInvoices(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = invoicesService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = invoicesService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = invoicesService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await invoicesService.findMany(query, options);
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

  const getInvoicesCount = async (data) => {
    try {
      if (data && data.where){
        makeInvoices(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await invoicesService.count(where);
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

  const softDeleteManyInvoices = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        const options = {};
        let data = await invoicesService.softDeleteMany(query,updateBody);
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

  const bulkInsertInvoices = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const invoicesEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeInvoices(item,'insertInvoicesValidator');
      });
      const results = await invoicesService.createMany(invoicesEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkUpdateInvoices = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const invoices = makeInvoices(data.data,'updateInvoicesValidator');
        const filterData = removeEmpty(invoices);
        const updatedInvoicess = await invoicesService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedInvoicess });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const deleteManyInvoices = async (ids) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids } };
        let result = await invoicesService.deleteMany(query);
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

  const softDeleteInvoices = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedInvoices;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedInvoices = await invoicesService.softDeleteMany(query, updateBody);
        return message.successResponse({ data:updatedInvoices });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateInvoices = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const invoices = makeInvoices(data,'updateInvoicesValidator');
        const filterData = removeEmpty(invoices);
        let query = { id:id };
        let updatedInvoices = await invoicesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedInvoices });
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

  const updateInvoices = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const invoices = makeInvoices(data,'updateInvoicesValidator');
        const filterData = removeEmpty(invoices);
        let query = { id:pk };
        let updatedInvoices = await invoicesService.updateMany(query,filterData);
        return message.successResponse({ data:updatedInvoices });
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

  const findInvoicesByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeInvoices(body, 'findFilterKeys',true);
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
      let result = await invoicesService.findByPk(pk, options);
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

  const deleteInvoices = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedInvoices = '';
      deletedInvoices = await invoicesService.deleteByPk(pk,options);  
      return message.successResponse({ data: deletedInvoices });
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
    addInvoices,
    findAllInvoices,
    getInvoicesCount,
    softDeleteManyInvoices,
    bulkInsertInvoices,
    bulkUpdateInvoices,
    deleteManyInvoices,
    softDeleteInvoices,
    partialUpdateInvoices,
    updateInvoices,
    findInvoicesByPk,
    deleteInvoices
  });
}

module.exports = makeInvoicesController;

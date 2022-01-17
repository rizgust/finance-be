
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeProjectRouteController ({
  projectRouteService,makeProjectRoute
})
{
  const addProjectRoute = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const projectRoute = makeProjectRoute(originalData, 'insertProjectRouteValidator');
      let createdProjectRoute = await projectRouteService.createOne(projectRoute);
      return message.successResponse({ data:createdProjectRoute });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkInsertProjectRoute = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const projectRouteEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeProjectRoute(item,'insertProjectRouteValidator');
      });
      const results = await projectRouteService.createMany(projectRouteEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllProjectRoute = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeProjectRoute(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = projectRouteService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = projectRouteService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = projectRouteService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await projectRouteService.findMany(query, options);
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

  const getProjectRouteCount = async (data) => {
    try {
      if (data && data.where){
        makeProjectRoute(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await projectRouteService.count(where);
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

  const upsertProjectRoute = async (data)=>{
    try {
      if (data){
        let result = await projectRouteService.upsert(data);
        if (result){
          return message.successResponse();
        }
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };
  const bulkUpdateProjectRoute = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const projectRoute = makeProjectRoute(data.data,'updateProjectRouteValidator');
        const filterData = removeEmpty(projectRoute);
        const updatedProjectRoutes = await projectRouteService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedProjectRoutes });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const softDeleteManyProjectRoute = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        let data = await deleteDependentService.softDeleteProjectRoute(query, updateBody);
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

  const deleteManyProjectRoute = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { id:{ [Op.in]: ids } };
        let result;
        if (data.isWarning){
          result = await deleteDependentService.countProjectRoute(query);
        }
        else {
          result = await deleteDependentService.deleteProjectRoute(query);
        }
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

  const softDeleteProjectRoute = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedProjectRoute;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedProjectRoute = await deleteDependentService.softDeleteProjectRoute(query, updateBody);            
        return message.successResponse({ data:updatedProjectRoute });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateProjectRoute = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const projectRoute = makeProjectRoute(data,'updateProjectRouteValidator');
        const filterData = removeEmpty(projectRoute);
        let query = { id:id };
        let updatedProjectRoute = await projectRouteService.updateMany(query,filterData);
        return message.successResponse({ data:updatedProjectRoute });
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

  const updateProjectRoute = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const projectRoute = makeProjectRoute(data,'updateProjectRouteValidator');
        const filterData = removeEmpty(projectRoute);
        let query = { id:pk };
        let updatedProjectRoute = await projectRouteService.updateMany(query,filterData);
        return message.successResponse({ data:updatedProjectRoute });
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

  const findProjectRouteByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeProjectRoute(body, 'findFilterKeys',true);
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
      let result = await projectRouteService.findByPk(pk, options);
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

  const deleteProjectRoute = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedProjectRoute = '';
      let query = { id:pk };
      if (isWarning){
        deletedProjectRoute = await deleteDependentService.countProjectRoute(query);
      } else {
        deletedProjectRoute = await deleteDependentService.deleteProjectRoute(query);
      }
      return message.successResponse({ data: deletedProjectRoute });
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
    addProjectRoute,
    bulkInsertProjectRoute,
    findAllProjectRoute,
    getProjectRouteCount,
    upsertProjectRoute,
    bulkUpdateProjectRoute,
    softDeleteManyProjectRoute,
    deleteManyProjectRoute,
    softDeleteProjectRoute,
    partialUpdateProjectRoute,
    updateProjectRoute,
    findProjectRouteByPk,
    deleteProjectRoute
  });
}

module.exports = makeProjectRouteController;

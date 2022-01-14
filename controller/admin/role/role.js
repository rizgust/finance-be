
const { Op } = require('sequelize');
const deleteDependentService = require('../../../utils/deleteDependent');
const message = require('../../../utils/messages');
const models = require('../../../model');
function makeRoleController ({
  roleService,makeRole
})
{
  const addRole = async ({
    data,loggedInUser
  }) => {
    try {
      let originalData = { ...data };
      delete originalData.addedBy;
      delete originalData.updatedBy;
      originalData.addedBy = loggedInUser.id;
      const role = makeRole(originalData, 'insertRoleValidator');
      let createdRole = await roleService.createOne(role);
      return message.successResponse({ data:createdRole });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const bulkInsertRole = async ({
    body,loggedInUser
  })=>{
    try {
      let data = body.data;
      const roleEntities = data.map((item)=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = loggedInUser.id;
        return makeRole(item,'insertRoleValidator');
      });
      const results = await roleService.createMany(roleEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError') {
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const findAllRole = async ({
    data,loggedInUser
  }) => {
    try {
      let query = {};
      let options = {};
      makeRole(data, 'findFilterKeys',true);
      if (data.query !== undefined){
        query = { ...data.query };
      }
      if (data.options !== undefined){
        options = { ...data.options };
      }
      query = roleService.queryBuilderParser(query);
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
      if (options && options.sort){
        options.order = roleService.sortParser(options.sort);
        delete options.sort;
      }
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = roleService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      } 
      let result = await roleService.findMany(query, options);
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

  const getRoleCount = async (data) => {
    try {
      if (data && data.where){
        makeRole(data, 'findFilterKeys');
        where = data.where;
      }

      let result = await roleService.count(where);
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

  const upsertRole = async (data)=>{
    try {
      if (data){
        let result = await roleService.upsert(data);
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
  const bulkUpdateRole = async (data,loggedInUser) =>{
    try {
      if (data.filter && data.data){
        delete data.data.addedBy;
        delete data.data.updatedBy;
        data.data.updatedBy = loggedInUser.id;
        const role = makeRole(data.data,'updateRoleValidator');
        const filterData = removeEmpty(role);
        const updatedRoles = await roleService.updateMany(data.filter,filterData);
        return message.successResponse({ data:updatedRoles });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const softDeleteManyRole = async (ids,loggedInUser) => {
    try {
      if (ids){
        const query = { id:{ [Op.in]: ids, } };
        const updateBody = { isDeleted: true, };
        let data = await deleteDependentService.softDeleteRole(query, updateBody);
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

  const deleteManyRole = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { id:{ [Op.in]: ids } };
        let result;
        if (data.isWarning){
          result = await deleteDependentService.countRole(query);
        }
        else {
          result = await deleteDependentService.deleteRole(query);
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

  const softDeleteRole = async ({
    pk,loggedInUser
  },options = {})=>{
    try {
      if (pk){
        let updatedRole;
        let query = { id:pk };
        const updateBody = { isDeleted: true, };
        updatedRole = await deleteDependentService.softDeleteRole(query, updateBody);            
        return message.successResponse({ data:updatedRole });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };

  const partialUpdateRole = async (id,data,loggedInUser) =>{
    try {
      if (data && id){          
        const role = makeRole(data,'updateRoleValidator');
        const filterData = removeEmpty(role);
        let query = { id:id };
        let updatedRole = await roleService.updateMany(query,filterData);
        return message.successResponse({ data:updatedRole });
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

  const updateRole = async (pk, data,loggedInUser) =>{
    try {
      if (pk){
        delete data.addedBy;
        delete data.updatedBy;
        data.updatedBy = loggedInUser.id;
        const role = makeRole(data,'updateRoleValidator');
        const filterData = removeEmpty(role);
        let query = { id:pk };
        let updatedRole = await roleService.updateMany(query,filterData);
        return message.successResponse({ data:updatedRole });
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

  const findRoleByPk = async (pk,body = {}) => {
    try {
      let options = {};
      if (body && body.select && body.select.length) {
        makeRole(body, 'findFilterKeys',true);
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
      let result = await roleService.findByPk(pk, options);
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

  const deleteRole = async (pk, body,loggedInUser,options = {})=>{
    try {
      if (!pk){
        return message.badRequest();
      }
      let deletedRole = '';
      let query = { id:pk };
      if (isWarning){
        deletedRole = await deleteDependentService.countRole(query);
      } else {
        deletedRole = await deleteDependentService.deleteRole(query);
      }
      return message.successResponse({ data: deletedRole });
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
    addRole,
    bulkInsertRole,
    findAllRole,
    getRoleCount,
    upsertRole,
    bulkUpdateRole,
    softDeleteManyRole,
    deleteManyRole,
    softDeleteRole,
    partialUpdateRole,
    updateRole,
    findRoleByPk,
    deleteRole
  });
}

module.exports = makeRoleController;

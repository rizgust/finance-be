
function buildMakeRouteRole ({
  insertRouteRoleValidator,updateRouteRoleValidator,filterValidator, routeroleModel
}){
  return function makeRouteRole (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertRouteRoleValidator':
      isValid = insertRouteRoleValidator(data);
      break;

    case 'updateRouteRoleValidator':
      isValid = updateRouteRoleValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && routeroleModel !== undefined) {
        isValid = filterValidator(data, routeroleModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in RouteRole entity. ${isValid.error}`
      });
    }
      
    return {
      routeId:data.routeId,
      roleId:data.roleId,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
      id:data.id,
    };
  };
}
module.exports =  buildMakeRouteRole;

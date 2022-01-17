
function buildMakeProjectRoute ({
  insertProjectRouteValidator,updateProjectRouteValidator,filterValidator, projectrouteModel
}){
  return function makeProjectRoute (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertProjectRouteValidator':
      isValid = insertProjectRouteValidator(data);
      break;

    case 'updateProjectRouteValidator':
      isValid = updateProjectRouteValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && projectrouteModel !== undefined) {
        isValid = filterValidator(data, projectrouteModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in ProjectRoute entity. ${isValid.error}`
      });
    }
      
    return {
      route_name:data.route_name,
      method:data.method,
      uri:data.uri,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
      id:data.id,
    };
  };
}
module.exports =  buildMakeProjectRoute;

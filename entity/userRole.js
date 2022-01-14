
function buildMakeUserRole ({
  insertUserRoleValidator,updateUserRoleValidator,filterValidator, userroleModel
}){
  return function makeUserRole (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertUserRoleValidator':
      isValid = insertUserRoleValidator(data);
      break;

    case 'updateUserRoleValidator':
      isValid = updateUserRoleValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && userroleModel !== undefined) {
        isValid = filterValidator(data, userroleModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in UserRole entity. ${isValid.error}`
      });
    }
      
    return {
      userId:data.userId,
      roleId:data.roleId,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
      id:data.id,
    };
  };
}
module.exports =  buildMakeUserRole;

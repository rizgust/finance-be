
function buildMakeRole ({
  insertRoleValidator,updateRoleValidator,filterValidator, roleModel
}){
  return function makeRole (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertRoleValidator':
      isValid = insertRoleValidator(data);
      break;

    case 'updateRoleValidator':
      isValid = updateRoleValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && roleModel !== undefined) {
        isValid = filterValidator(data, roleModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Role entity. ${isValid.error}`
      });
    }
      
    return {
      name:data.name,
      code:data.code,
      weight:data.weight,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
      id:data.id,
    };
  };
}
module.exports =  buildMakeRole;


function buildMakeUserToken ({
  insertUserTokenValidator,updateUserTokenValidator,filterValidator, usertokenModel
}){
  return function makeUserToken (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertUserTokenValidator':
      isValid = insertUserTokenValidator(data);
      break;

    case 'updateUserTokenValidator':
      isValid = updateUserTokenValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && usertokenModel !== undefined) {
        isValid = filterValidator(data, usertokenModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in UserToken entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      userId:data.userId,
      token:data.token,
      tokenExpiredTime:data.tokenExpiredTime,
      isTokenExpired:data.isTokenExpired,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeUserToken;

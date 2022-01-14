
function buildMakeUserAuthSettings ({
  insertUserAuthSettingsValidator,updateUserAuthSettingsValidator,filterValidator, userauthsettingsModel
}){
  return function makeUserAuthSettings (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertUserAuthSettingsValidator':
      isValid = insertUserAuthSettingsValidator(data);
      break;

    case 'updateUserAuthSettingsValidator':
      isValid = updateUserAuthSettingsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && userauthsettingsModel !== undefined) {
        isValid = filterValidator(data, userauthsettingsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in UserAuthSettings entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      userId:data.userId,
      loginOTP:data.loginOTP,
      expiredTimeOfLoginOTP:data.expiredTimeOfLoginOTP,
      resetPasswordCode:data.resetPasswordCode,
      expiredTimeOfResetPasswordCode:data.expiredTimeOfResetPasswordCode,
      loginRetryLimit:data.loginRetryLimit,
      loginReactiveTime:data.loginReactiveTime,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeUserAuthSettings;

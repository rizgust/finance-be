
function buildMakeAccount_receiveables ({
  insertAccount_receiveablesValidator,updateAccount_receiveablesValidator,filterValidator, account_receiveablesModel
}){
  return function makeAccount_receiveables (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertAccount_receiveablesValidator':
      isValid = insertAccount_receiveablesValidator(data);
      break;

    case 'updateAccount_receiveablesValidator':
      isValid = updateAccount_receiveablesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && account_receiveablesModel !== undefined) {
        isValid = filterValidator(data, account_receiveablesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Account_receiveables entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      code:data.code,
      name:data.name,
      description:data.description,
      src_account_id:data.src_account_id,
      dst_account_id:data.dst_account_id,
      recurring_type:data.recurring_type,
      recurring_periode:data.recurring_periode,
      user_type:data.user_type,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      deleted_at:data.deleted_at,
      deleted_by:data.deleted_by,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeAccount_receiveables;

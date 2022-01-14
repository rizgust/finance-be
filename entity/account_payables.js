
function buildMakeAccount_payables ({
  insertAccount_payablesValidator,updateAccount_payablesValidator,filterValidator, account_payablesModel
}){
  return function makeAccount_payables (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertAccount_payablesValidator':
      isValid = insertAccount_payablesValidator(data);
      break;

    case 'updateAccount_payablesValidator':
      isValid = updateAccount_payablesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && account_payablesModel !== undefined) {
        isValid = filterValidator(data, account_payablesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Account_payables entity. ${isValid.error}`
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
module.exports =  buildMakeAccount_payables;

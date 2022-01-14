
function buildMakeAccount_receiveable_rules ({
  insertAccount_receiveable_rulesValidator,updateAccount_receiveable_rulesValidator,filterValidator, account_receiveable_rulesModel
}){
  return function makeAccount_receiveable_rules (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertAccount_receiveable_rulesValidator':
      isValid = insertAccount_receiveable_rulesValidator(data);
      break;

    case 'updateAccount_receiveable_rulesValidator':
      isValid = updateAccount_receiveable_rulesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && account_receiveable_rulesModel !== undefined) {
        isValid = filterValidator(data, account_receiveable_rulesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Account_receiveable_rules entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      ar_id:data.ar_id,
      period_id:data.period_id,
      rule:data.rule,
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
module.exports =  buildMakeAccount_receiveable_rules;

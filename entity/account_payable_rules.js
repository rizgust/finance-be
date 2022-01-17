
function buildMakeAccount_payable_rules ({
  insertAccount_payable_rulesValidator,updateAccount_payable_rulesValidator,filterValidator, account_payable_rulesModel
}){
  return function makeAccount_payable_rules (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertAccount_payable_rulesValidator':
      isValid = insertAccount_payable_rulesValidator(data);
      break;

    case 'updateAccount_payable_rulesValidator':
      isValid = updateAccount_payable_rulesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && account_payable_rulesModel !== undefined) {
        isValid = filterValidator(data, account_payable_rulesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Account_payable_rules entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      ap_id:data.ap_id,
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
module.exports =  buildMakeAccount_payable_rules;


function buildMakeGeneral_ledger_details ({
  insertGeneral_ledger_detailsValidator,updateGeneral_ledger_detailsValidator,filterValidator, general_ledger_detailsModel
}){
  return function makeGeneral_ledger_details (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertGeneral_ledger_detailsValidator':
      isValid = insertGeneral_ledger_detailsValidator(data);
      break;

    case 'updateGeneral_ledger_detailsValidator':
      isValid = updateGeneral_ledger_detailsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && general_ledger_detailsModel !== undefined) {
        isValid = filterValidator(data, general_ledger_detailsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in General_ledger_details entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      general_ledger_id:data.general_ledger_id,
      account_id:data.account_id,
      debit:data.debit,
      credit:data.credit,
      balance_before:data.balance_before,
      balance:data.balance,
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
module.exports =  buildMakeGeneral_ledger_details;

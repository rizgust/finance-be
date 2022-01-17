
function buildMakeTrx_expense_details ({
  insertTrx_expense_detailsValidator,updateTrx_expense_detailsValidator,filterValidator, trx_expense_detailsModel
}){
  return function makeTrx_expense_details (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertTrx_expense_detailsValidator':
      isValid = insertTrx_expense_detailsValidator(data);
      break;

    case 'updateTrx_expense_detailsValidator':
      isValid = updateTrx_expense_detailsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && trx_expense_detailsModel !== undefined) {
        isValid = filterValidator(data, trx_expense_detailsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Trx_expense_details entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      trx_expenses_id:data.trx_expenses_id,
      amount:data.amount,
      is_source:data.is_source,
      account_id:data.account_id,
      model:data.model,
      model_id:data.model_id,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeTrx_expense_details;

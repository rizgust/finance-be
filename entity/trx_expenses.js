
function buildMakeTrx_expenses ({
  insertTrx_expensesValidator,updateTrx_expensesValidator,filterValidator, trx_expensesModel
}){
  return function makeTrx_expenses (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertTrx_expensesValidator':
      isValid = insertTrx_expensesValidator(data);
      break;

    case 'updateTrx_expensesValidator':
      isValid = updateTrx_expensesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && trx_expensesModel !== undefined) {
        isValid = filterValidator(data, trx_expensesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Trx_expenses entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      user_id:data.user_id,
      number:data.number,
      amount:data.amount,
      date:data.date,
      status:data.status,
      description:data.description,
      payment_method:data.payment_method,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      journal_id:data.journal_id,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeTrx_expenses;

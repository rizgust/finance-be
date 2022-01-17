
function buildMakePurchases ({
  insertPurchasesValidator,updatePurchasesValidator,filterValidator, purchasesModel
}){
  return function makePurchases (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertPurchasesValidator':
      isValid = insertPurchasesValidator(data);
      break;

    case 'updatePurchasesValidator':
      isValid = updatePurchasesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && purchasesModel !== undefined) {
        isValid = filterValidator(data, purchasesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Purchases entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      user_id:data.user_id,
      number:data.number,
      ap_id:data.ap_id,
      status:data.status,
      amount:data.amount,
      amount_paid:data.amount_paid,
      date:data.date,
      due_date:data.due_date,
      additional_info:data.additional_info,
      period_id:data.period_id,
      expense_id:data.expense_id,
      discount_id:data.discount_id,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      deleted_at:data.deleted_at,
      deleted_by:data.deleted_by,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakePurchases;

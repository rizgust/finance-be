
function buildMakeTrx_receives ({
  insertTrx_receivesValidator,updateTrx_receivesValidator,filterValidator, trx_receivesModel
}){
  return function makeTrx_receives (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertTrx_receivesValidator':
      isValid = insertTrx_receivesValidator(data);
      break;

    case 'updateTrx_receivesValidator':
      isValid = updateTrx_receivesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && trx_receivesModel !== undefined) {
        isValid = filterValidator(data, trx_receivesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Trx_receives entity. ${isValid.error}`
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
module.exports =  buildMakeTrx_receives;

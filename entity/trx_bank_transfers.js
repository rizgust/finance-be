
function buildMakeTrx_bank_transfers ({
  insertTrx_bank_transfersValidator,updateTrx_bank_transfersValidator,filterValidator, trx_bank_transfersModel
}){
  return function makeTrx_bank_transfers (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertTrx_bank_transfersValidator':
      isValid = insertTrx_bank_transfersValidator(data);
      break;

    case 'updateTrx_bank_transfersValidator':
      isValid = updateTrx_bank_transfersValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && trx_bank_transfersModel !== undefined) {
        isValid = filterValidator(data, trx_bank_transfersModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Trx_bank_transfers entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      user_id:data.user_id,
      bank_id:data.bank_id,
      number:data.number,
      date:data.date,
      with:data.with,
      zone:data.zone,
      status:data.status,
      amount:data.amount,
      description:data.description,
      dest_model:data.dest_model,
      dest_model_id:data.dest_model_id,
      account_owner:data.account_owner,
      account_number:data.account_number,
      additional_info:data.additional_info,
      trx_receives_id:data.trx_receives_id,
      created_at:data.created_at,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeTrx_bank_transfers;

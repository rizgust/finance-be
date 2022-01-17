
function buildMakeTrx_wallets ({
  insertTrx_walletsValidator,updateTrx_walletsValidator,filterValidator, trx_walletsModel
}){
  return function makeTrx_wallets (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertTrx_walletsValidator':
      isValid = insertTrx_walletsValidator(data);
      break;

    case 'updateTrx_walletsValidator':
      isValid = updateTrx_walletsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && trx_walletsModel !== undefined) {
        isValid = filterValidator(data, trx_walletsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Trx_wallets entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      wallet_id:data.wallet_id,
      amount:data.amount,
      balance_before:data.balance_before,
      balance:data.balance,
      dest_model:data.dest_model,
      dest_model_id:data.dest_model_id,
      trx_receives_id:data.trx_receives_id,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      debit:data.debit,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeTrx_wallets;

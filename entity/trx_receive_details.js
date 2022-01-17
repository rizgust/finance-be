
function buildMakeTrx_receive_details ({
  insertTrx_receive_detailsValidator,updateTrx_receive_detailsValidator,filterValidator, trx_receive_detailsModel
}){
  return function makeTrx_receive_details (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertTrx_receive_detailsValidator':
      isValid = insertTrx_receive_detailsValidator(data);
      break;

    case 'updateTrx_receive_detailsValidator':
      isValid = updateTrx_receive_detailsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && trx_receive_detailsModel !== undefined) {
        isValid = filterValidator(data, trx_receive_detailsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Trx_receive_details entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      trx_receives_id:data.trx_receives_id,
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
module.exports =  buildMakeTrx_receive_details;

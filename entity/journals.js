
function buildMakeJournals ({
  insertJournalsValidator,updateJournalsValidator,filterValidator, journalsModel
}){
  return function makeJournals (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertJournalsValidator':
      isValid = insertJournalsValidator(data);
      break;

    case 'updateJournalsValidator':
      isValid = updateJournalsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && journalsModel !== undefined) {
        isValid = filterValidator(data, journalsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Journals entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      number:data.number,
      date:data.date,
      general_ledger_id:data.general_ledger_id,
      status:data.status,
      amount:data.amount,
      description:data.description,
      reff_model:data.reff_model,
      reff_model_id:data.reff_model_id,
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
module.exports =  buildMakeJournals;

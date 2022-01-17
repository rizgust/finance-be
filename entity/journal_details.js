
function buildMakeJournal_details ({
  insertJournal_detailsValidator,updateJournal_detailsValidator,filterValidator, journal_detailsModel
}){
  return function makeJournal_details (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertJournal_detailsValidator':
      isValid = insertJournal_detailsValidator(data);
      break;

    case 'updateJournal_detailsValidator':
      isValid = updateJournal_detailsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && journal_detailsModel !== undefined) {
        isValid = filterValidator(data, journal_detailsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Journal_details entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      account_id:data.account_id,
      journal_id:data.journal_id,
      amount:data.amount,
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
module.exports =  buildMakeJournal_details;

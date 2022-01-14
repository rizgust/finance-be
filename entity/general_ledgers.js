
function buildMakeGeneral_ledgers ({
  insertGeneral_ledgersValidator,updateGeneral_ledgersValidator,filterValidator, general_ledgersModel
}){
  return function makeGeneral_ledgers (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertGeneral_ledgersValidator':
      isValid = insertGeneral_ledgersValidator(data);
      break;

    case 'updateGeneral_ledgersValidator':
      isValid = updateGeneral_ledgersValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && general_ledgersModel !== undefined) {
        isValid = filterValidator(data, general_ledgersModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in General_ledgers entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      number:data.number,
      status:data.status,
      date:data.date,
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
module.exports =  buildMakeGeneral_ledgers;

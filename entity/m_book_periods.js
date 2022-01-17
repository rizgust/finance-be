
function buildMakeM_book_periods ({
  insertM_book_periodsValidator,updateM_book_periodsValidator,filterValidator, m_book_periodsModel
}){
  return function makeM_book_periods (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertM_book_periodsValidator':
      isValid = insertM_book_periodsValidator(data);
      break;

    case 'updateM_book_periodsValidator':
      isValid = updateM_book_periodsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && m_book_periodsModel !== undefined) {
        isValid = filterValidator(data, m_book_periodsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in M_book_periods entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      code:data.code,
      name:data.name,
      description:data.description,
      status:data.status,
      start_date:data.start_date,
      end_date:data.end_date,
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
module.exports =  buildMakeM_book_periods;

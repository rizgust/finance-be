
function buildMakeM_discounts ({
  insertM_discountsValidator,updateM_discountsValidator,filterValidator, m_discountsModel
}){
  return function makeM_discounts (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertM_discountsValidator':
      isValid = insertM_discountsValidator(data);
      break;

    case 'updateM_discountsValidator':
      isValid = updateM_discountsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && m_discountsModel !== undefined) {
        isValid = filterValidator(data, m_discountsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in M_discounts entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      code:data.code,
      name:data.name,
      description:data.description,
      is_active:data.is_active,
      value:data.value,
      is_percent:data.is_percent,
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
module.exports =  buildMakeM_discounts;


function buildMakeM_banks ({
  insertM_banksValidator,updateM_banksValidator,filterValidator, m_banksModel
}){
  return function makeM_banks (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertM_banksValidator':
      isValid = insertM_banksValidator(data);
      break;

    case 'updateM_banksValidator':
      isValid = updateM_banksValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && m_banksModel !== undefined) {
        isValid = filterValidator(data, m_banksModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in M_banks entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      code:data.code,
      name:data.name,
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
module.exports =  buildMakeM_banks;

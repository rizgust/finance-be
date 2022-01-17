
function buildMakeM_virtual_accounts ({
  insertM_virtual_accountsValidator,updateM_virtual_accountsValidator,filterValidator, m_virtual_accountsModel
}){
  return function makeM_virtual_accounts (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertM_virtual_accountsValidator':
      isValid = insertM_virtual_accountsValidator(data);
      break;

    case 'updateM_virtual_accountsValidator':
      isValid = updateM_virtual_accountsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && m_virtual_accountsModel !== undefined) {
        isValid = filterValidator(data, m_virtual_accountsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in M_virtual_accounts entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      bank_id:data.bank_id,
      number:data.number,
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
module.exports =  buildMakeM_virtual_accounts;

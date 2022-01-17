
function buildMakeM_bank_accounts ({
  insertM_bank_accountsValidator,updateM_bank_accountsValidator,filterValidator, m_bank_accountsModel
}){
  return function makeM_bank_accounts (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertM_bank_accountsValidator':
      isValid = insertM_bank_accountsValidator(data);
      break;

    case 'updateM_bank_accountsValidator':
      isValid = updateM_bank_accountsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && m_bank_accountsModel !== undefined) {
        isValid = filterValidator(data, m_bank_accountsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in M_bank_accounts entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      bank_id:data.bank_id,
      branch_name:data.branch_name,
      name:data.name,
      number:data.number,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeM_bank_accounts;

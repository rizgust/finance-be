
function buildMakeM_chart_of_accounts ({
  insertM_chart_of_accountsValidator,updateM_chart_of_accountsValidator,filterValidator, m_chart_of_accountsModel
}){
  return function makeM_chart_of_accounts (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertM_chart_of_accountsValidator':
      isValid = insertM_chart_of_accountsValidator(data);
      break;

    case 'updateM_chart_of_accountsValidator':
      isValid = updateM_chart_of_accountsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && m_chart_of_accountsModel !== undefined) {
        isValid = filterValidator(data, m_chart_of_accountsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in M_chart_of_accounts entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      code:data.code,
      name:data.name,
      description:data.description,
      category:data.category,
      level:data.level,
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
module.exports =  buildMakeM_chart_of_accounts;

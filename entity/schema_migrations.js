
function buildMakeSchema_migrations ({
  insertSchema_migrationsValidator,updateSchema_migrationsValidator,filterValidator, schema_migrationsModel
}){
  return function makeSchema_migrations (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertSchema_migrationsValidator':
      isValid = insertSchema_migrationsValidator(data);
      break;

    case 'updateSchema_migrationsValidator':
      isValid = updateSchema_migrationsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && schema_migrationsModel !== undefined) {
        isValid = filterValidator(data, schema_migrationsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Schema_migrations entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      version:data.version,
      dirty:data.dirty,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeSchema_migrations;

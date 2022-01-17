
function buildMakeWallets ({
  insertWalletsValidator,updateWalletsValidator,filterValidator, walletsModel
}){
  return function makeWallets (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertWalletsValidator':
      isValid = insertWalletsValidator(data);
      break;

    case 'updateWalletsValidator':
      isValid = updateWalletsValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && walletsModel !== undefined) {
        isValid = filterValidator(data, walletsModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Wallets entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      user_id:data.user_id,
      code:data.code,
      name:data.name,
      balance:data.balance,
      account_id:data.account_id,
      other_info:data.other_info,
      allow_minus:data.allow_minus,
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
module.exports =  buildMakeWallets;

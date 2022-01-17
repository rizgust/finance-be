
function buildMakeInvoices ({
  insertInvoicesValidator,updateInvoicesValidator,filterValidator, invoicesModel
}){
  return function makeInvoices (data,validatorName,flag){
    let isValid = '';
    switch (validatorName){
    case 'insertInvoicesValidator':
      isValid = insertInvoicesValidator(data);
      break;

    case 'updateInvoicesValidator':
      isValid = updateInvoicesValidator(data);  
      break; 

    case 'findFilterKeys':
      if (flag && invoicesModel !== undefined) {
        isValid = filterValidator(data, invoicesModel.tableAttributes);
      } else {
        isValid = filterValidator(data);
      }
      break;
     
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Invoices entity. ${isValid.error}`
      });
    }
      
    return {
      id:data.id,
      owner_id:data.owner_id,
      user_id:data.user_id,
      number:data.number,
      ar_id:data.ar_id,
      status:data.status,
      amount:data.amount,
      amount_paid:data.amount_paid,
      date:data.date,
      due_date:data.due_date,
      additional_info:data.additional_info,
      payment_id:data.payment_id,
      discount_id:data.discount_id,
      created_at:data.created_at,
      with:data.with,
      zone:data.zone,
      created_by:data.created_by,
      updated_at:data.updated_at,
      updated_by:data.updated_by,
      deleted_at:data.deleted_at,
      deleted_by:data.deleted_by,
      period_id:data.period_id,
      class_program_id:data.class_program_id,
      class_level_id:data.class_level_id,
      class_specialization_id:data.class_specialization_id,
      male:data.male,
      recurring_type:data.recurring_type,
      recurring_period:data.recurring_period,
      installment:data.installment,
      mutation:data.mutation,
      boarding:data.boarding,
      admission_line_id:data.admission_line_id,
      admission_batch_id:data.admission_batch_id,
      isActive:data.isActive,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeInvoices;

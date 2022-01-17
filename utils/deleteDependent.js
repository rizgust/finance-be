let Wallets = require('../model').wallets;
let Trx_wallets = require('../model').trx_wallets;
let Trx_receives = require('../model').trx_receives;
let Trx_receive_details = require('../model').trx_receive_details;
let Trx_expenses = require('../model').trx_expenses;
let Trx_expense_details = require('../model').trx_expense_details;
let Trx_bank_transfers = require('../model').trx_bank_transfers;
let Purchases = require('../model').purchases;
let M_virtual_accounts = require('../model').m_virtual_accounts;
let M_discounts = require('../model').m_discounts;
let M_chart_of_accounts = require('../model').m_chart_of_accounts;
let M_book_periods = require('../model').m_book_periods;
let M_banks = require('../model').m_banks;
let M_bank_accounts = require('../model').m_bank_accounts;
let Journals = require('../model').journals;
let Journal_details = require('../model').journal_details;
let Invoices = require('../model').invoices;
let General_ledgers = require('../model').general_ledgers;
let General_ledger_details = require('../model').general_ledger_details;
let Account_receiveables = require('../model').account_receiveables;
let Account_receiveable_rules = require('../model').account_receiveable_rules;
let Account_payables = require('../model').account_payables;
let Account_payable_rules = require('../model').account_payable_rules;
let User = require('../model').user;
let UserAuthSettings = require('../model').userAuthSettings;
let UserToken = require('../model').userToken;
let Role = require('../model').role;
let ProjectRoute = require('../model').projectRoute;
let RouteRole = require('../model').routeRole;
let UserRole = require('../model').userRole;
const { Op } = require('sequelize');

const deleteWallets = async (filter) =>{
  try {
    return await Wallets.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrx_wallets = async (filter) =>{
  try {
    return await Trx_wallets.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrx_receives = async (filter) =>{
  try {
    return await Trx_receives.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrx_receive_details = async (filter) =>{
  try {
    return await Trx_receive_details.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrx_expenses = async (filter) =>{
  try {
    return await Trx_expenses.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrx_expense_details = async (filter) =>{
  try {
    return await Trx_expense_details.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTrx_bank_transfers = async (filter) =>{
  try {
    return await Trx_bank_transfers.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePurchases = async (filter) =>{
  try {
    return await Purchases.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteM_virtual_accounts = async (filter) =>{
  try {
    return await M_virtual_accounts.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteM_discounts = async (filter) =>{
  try {
    return await M_discounts.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteM_chart_of_accounts = async (filter) =>{
  try {
    return await M_chart_of_accounts.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteM_book_periods = async (filter) =>{
  try {
    return await M_book_periods.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteM_banks = async (filter) =>{
  try {
    return await M_banks.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteM_bank_accounts = async (filter) =>{
  try {
    return await M_bank_accounts.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteJournals = async (filter) =>{
  try {
    return await Journals.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteJournal_details = async (filter) =>{
  try {
    return await Journal_details.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteInvoices = async (filter) =>{
  try {
    return await Invoices.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGeneral_ledgers = async (filter) =>{
  try {
    return await General_ledgers.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGeneral_ledger_details = async (filter) =>{
  try {
    return await General_ledger_details.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAccount_receiveables = async (filter) =>{
  try {
    return await Account_receiveables.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAccount_receiveable_rules = async (filter) =>{
  try {
    return await Account_receiveable_rules.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAccount_payables = async (filter) =>{
  try {
    return await Account_payables.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAccount_payable_rules = async (filter) =>{
  try {
    return await Account_payable_rules.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });        
    if (user && user.length){    
      user = user.map(x=>x.dataValues);
      user = user.map((obj) => obj.id);
      const userFilter69015 = { 'addedBy': { [Op.in]: user } };
      const user70524 = await deleteUser(userFilter69015);
      const userFilter72981 = { 'updatedBy': { [Op.in]: user } };
      const user64899 = await deleteUser(userFilter72981);
      const userAuthSettingsFilter91365 = { 'userId': { [Op.in]: user } };
      const userAuthSettings61394 = await deleteUserAuthSettings(userAuthSettingsFilter91365);
      const userTokenFilter16956 = { 'userId': { [Op.in]: user } };
      const userToken65592 = await deleteUserToken(userTokenFilter16956);
      const userRoleFilter71268 = { 'userId': { [Op.in]: user } };
      const userRole49813 = await deleteUserRole(userRoleFilter71268);
      return await User.destroy({ where :filter });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    return await UserAuthSettings.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserToken = async (filter) =>{
  try {
    return await UserToken.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });        
    if (role && role.length){    
      role = role.map(x=>x.dataValues);
      role = role.map((obj) => obj.id);
      const routeRoleFilter65913 = { 'roleId': { [Op.in]: role } };
      const routeRole17435 = await deleteRouteRole(routeRoleFilter65913);
      const userRoleFilter06701 = { 'roleId': { [Op.in]: role } };
      const userRole86028 = await deleteUserRole(userRoleFilter06701);
      return await Role.destroy({ where :filter });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });        
    if (projectroute && projectroute.length){    
      projectroute = projectroute.map(x=>x.dataValues);
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter17433 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole88649 = await deleteRouteRole(routeRoleFilter17433);
      return await ProjectRoute.destroy({ where :filter });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const countWallets = async (filter) =>{
  try {
    const walletsCnt =  await Wallets.count({ where:filter });
    return { wallets : walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrx_wallets = async (filter) =>{
  try {
    const trx_walletsCnt =  await Trx_wallets.count({ where:filter });
    return { trx_wallets : trx_walletsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrx_receives = async (filter) =>{
  try {
    const trx_receivesCnt =  await Trx_receives.count({ where:filter });
    return { trx_receives : trx_receivesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrx_receive_details = async (filter) =>{
  try {
    const trx_receive_detailsCnt =  await Trx_receive_details.count({ where:filter });
    return { trx_receive_details : trx_receive_detailsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrx_expenses = async (filter) =>{
  try {
    const trx_expensesCnt =  await Trx_expenses.count({ where:filter });
    return { trx_expenses : trx_expensesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrx_expense_details = async (filter) =>{
  try {
    const trx_expense_detailsCnt =  await Trx_expense_details.count({ where:filter });
    return { trx_expense_details : trx_expense_detailsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTrx_bank_transfers = async (filter) =>{
  try {
    const trx_bank_transfersCnt =  await Trx_bank_transfers.count({ where:filter });
    return { trx_bank_transfers : trx_bank_transfersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPurchases = async (filter) =>{
  try {
    const purchasesCnt =  await Purchases.count({ where:filter });
    return { purchases : purchasesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countM_virtual_accounts = async (filter) =>{
  try {
    const m_virtual_accountsCnt =  await M_virtual_accounts.count({ where:filter });
    return { m_virtual_accounts : m_virtual_accountsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countM_discounts = async (filter) =>{
  try {
    const m_discountsCnt =  await M_discounts.count({ where:filter });
    return { m_discounts : m_discountsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countM_chart_of_accounts = async (filter) =>{
  try {
    const m_chart_of_accountsCnt =  await M_chart_of_accounts.count({ where:filter });
    return { m_chart_of_accounts : m_chart_of_accountsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countM_book_periods = async (filter) =>{
  try {
    const m_book_periodsCnt =  await M_book_periods.count({ where:filter });
    return { m_book_periods : m_book_periodsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countM_banks = async (filter) =>{
  try {
    const m_banksCnt =  await M_banks.count({ where:filter });
    return { m_banks : m_banksCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countM_bank_accounts = async (filter) =>{
  try {
    const m_bank_accountsCnt =  await M_bank_accounts.count({ where:filter });
    return { m_bank_accounts : m_bank_accountsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countJournals = async (filter) =>{
  try {
    const journalsCnt =  await Journals.count({ where:filter });
    return { journals : journalsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countJournal_details = async (filter) =>{
  try {
    const journal_detailsCnt =  await Journal_details.count({ where:filter });
    return { journal_details : journal_detailsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countInvoices = async (filter) =>{
  try {
    const invoicesCnt =  await Invoices.count({ where:filter });
    return { invoices : invoicesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGeneral_ledgers = async (filter) =>{
  try {
    const general_ledgersCnt =  await General_ledgers.count({ where:filter });
    return { general_ledgers : general_ledgersCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGeneral_ledger_details = async (filter) =>{
  try {
    const general_ledger_detailsCnt =  await General_ledger_details.count({ where:filter });
    return { general_ledger_details : general_ledger_detailsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAccount_receiveables = async (filter) =>{
  try {
    const account_receiveablesCnt =  await Account_receiveables.count({ where:filter });
    return { account_receiveables : account_receiveablesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAccount_receiveable_rules = async (filter) =>{
  try {
    const account_receiveable_rulesCnt =  await Account_receiveable_rules.count({ where:filter });
    return { account_receiveable_rules : account_receiveable_rulesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAccount_payables = async (filter) =>{
  try {
    const account_payablesCnt =  await Account_payables.count({ where:filter });
    return { account_payables : account_payablesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAccount_payable_rules = async (filter) =>{
  try {
    const account_payable_rulesCnt =  await Account_payable_rules.count({ where:filter });
    return { account_payable_rules : account_payable_rulesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user && user.length){    
      user = user.map(x=>x.dataValues);
      user = user.map((obj) => obj.id);

      const userFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const userCnt =  await User.countDocuments(userFilter);

      const userAuthSettingsFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userAuthSettingsCnt =  await UserAuthSettings.countDocuments(userAuthSettingsFilter);

      const userTokenFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userTokenCnt =  await UserToken.countDocuments(userTokenFilter);

      const userRoleFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userRoleCnt =  await UserRole.countDocuments(userRoleFilter);

      let response = {
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userToken : userTokenCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await UserAuthSettings.count({ where:filter });
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserToken = async (filter) =>{
  try {
    const userTokenCnt =  await UserToken.count({ where:filter });
    return { userToken : userTokenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role && role.length){    
      role = role.map(x=>x.dataValues);
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { [Op.or]: [{                    roleId : { [Op.in] : role } }] };
      const routeRoleCnt =  await RouteRole.countDocuments(routeRoleFilter);

      const userRoleFilter = { [Op.or]: [{                    roleId : { [Op.in] : role } }] };
      const userRoleCnt =  await UserRole.countDocuments(userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute && projectroute.length){    
      projectroute = projectroute.map(x=>x.dataValues);
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { [Op.or]: [{                    routeId : { [Op.in] : projectroute } }] };
      const routeRoleCnt =  await RouteRole.countDocuments(routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.count({ where:filter });
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.count({ where:filter });
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWallets = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Wallets.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrx_wallets = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Trx_wallets.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrx_receives = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Trx_receives.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrx_receive_details = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Trx_receive_details.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrx_expenses = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Trx_expenses.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrx_expense_details = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Trx_expense_details.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTrx_bank_transfers = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Trx_bank_transfers.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePurchases = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Purchases.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteM_virtual_accounts = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await M_virtual_accounts.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteM_discounts = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await M_discounts.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteM_chart_of_accounts = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await M_chart_of_accounts.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteM_book_periods = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await M_book_periods.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteM_banks = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await M_banks.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteM_bank_accounts = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await M_bank_accounts.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteJournals = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Journals.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteJournal_details = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Journal_details.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteInvoices = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Invoices.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGeneral_ledgers = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await General_ledgers.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGeneral_ledger_details = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await General_ledger_details.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAccount_receiveables = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Account_receiveables.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAccount_receiveable_rules = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Account_receiveable_rules.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAccount_payables = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Account_payables.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAccount_payable_rules = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Account_payable_rules.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user && user.length){    
      user = user.map(x=>x.dataValues);
      user = user.map((obj) => obj.id);
      const userFilter43930 = { 'addedBy': { [Op.in]: user } };
      const user55374 = await softDeleteUser(userFilter43930,updateBody);
      const userFilter32607 = { 'updatedBy': { [Op.in]: user } };
      const user86543 = await softDeleteUser(userFilter32607,updateBody);
      const userAuthSettingsFilter36435 = { 'userId': { [Op.in]: user } };
      const userAuthSettings70817 = await softDeleteUserAuthSettings(userAuthSettingsFilter36435,updateBody);
      const userTokenFilter37698 = { 'userId': { [Op.in]: user } };
      const userToken67294 = await softDeleteUserToken(userTokenFilter37698,updateBody);
      const userRoleFilter22364 = { 'userId': { [Op.in]: user } };
      const userRole45957 = await softDeleteUserRole(userRoleFilter22364,updateBody);
      return await User.update({
        ...updateBody,
        ...defaultValues
      },{ where: filter });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await UserAuthSettings.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserToken = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await UserToken.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role && role.length){    
      role = role.map(x=>x.dataValues);
      role = role.map((obj) => obj.id);
      const routeRoleFilter38058 = { 'roleId': { [Op.in]: role } };
      const routeRole78905 = await softDeleteRouteRole(routeRoleFilter38058,updateBody);
      const userRoleFilter99593 = { 'roleId': { [Op.in]: role } };
      const userRole54792 = await softDeleteUserRole(userRoleFilter99593,updateBody);
      return await Role.update({
        ...updateBody,
        ...defaultValues
      },{ where: filter });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute && projectroute.length){    
      projectroute = projectroute.map(x=>x.dataValues);
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter80367 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole01213 = await softDeleteRouteRole(routeRoleFilter80367,updateBody);
      return await ProjectRoute.update({
        ...updateBody,
        ...defaultValues
      },{ where: filter });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await RouteRole.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await UserRole.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteWallets,
  deleteTrx_wallets,
  deleteTrx_receives,
  deleteTrx_receive_details,
  deleteTrx_expenses,
  deleteTrx_expense_details,
  deleteTrx_bank_transfers,
  deletePurchases,
  deleteM_virtual_accounts,
  deleteM_discounts,
  deleteM_chart_of_accounts,
  deleteM_book_periods,
  deleteM_banks,
  deleteM_bank_accounts,
  deleteJournals,
  deleteJournal_details,
  deleteInvoices,
  deleteGeneral_ledgers,
  deleteGeneral_ledger_details,
  deleteAccount_receiveables,
  deleteAccount_receiveable_rules,
  deleteAccount_payables,
  deleteAccount_payable_rules,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserToken,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countWallets,
  countTrx_wallets,
  countTrx_receives,
  countTrx_receive_details,
  countTrx_expenses,
  countTrx_expense_details,
  countTrx_bank_transfers,
  countPurchases,
  countM_virtual_accounts,
  countM_discounts,
  countM_chart_of_accounts,
  countM_book_periods,
  countM_banks,
  countM_bank_accounts,
  countJournals,
  countJournal_details,
  countInvoices,
  countGeneral_ledgers,
  countGeneral_ledger_details,
  countAccount_receiveables,
  countAccount_receiveable_rules,
  countAccount_payables,
  countAccount_payable_rules,
  countUser,
  countUserAuthSettings,
  countUserToken,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteWallets,
  softDeleteTrx_wallets,
  softDeleteTrx_receives,
  softDeleteTrx_receive_details,
  softDeleteTrx_expenses,
  softDeleteTrx_expense_details,
  softDeleteTrx_bank_transfers,
  softDeletePurchases,
  softDeleteM_virtual_accounts,
  softDeleteM_discounts,
  softDeleteM_chart_of_accounts,
  softDeleteM_book_periods,
  softDeleteM_banks,
  softDeleteM_bank_accounts,
  softDeleteJournals,
  softDeleteJournal_details,
  softDeleteInvoices,
  softDeleteGeneral_ledgers,
  softDeleteGeneral_ledger_details,
  softDeleteAccount_receiveables,
  softDeleteAccount_receiveable_rules,
  softDeleteAccount_payables,
  softDeleteAccount_payable_rules,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserToken,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};

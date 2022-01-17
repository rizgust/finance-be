let Wallets = require('../model').wallets;
let Trx_wallets = require('../model').trx_wallets;
let Trx_receives = require('../model').trx_receives;
let Trx_receive_details = require('../model').trx_receive_details;
let Trx_expenses = require('../model').trx_expenses;
let Trx_expense_details = require('../model').trx_expense_details;
let Trx_bank_transfers = require('../model').trx_bank_transfers;
let Schema_migrations = require('../model').schema_migrations;
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

const deleteSchema_migrations = async (filter) =>{
  try {
    return await Schema_migrations.destroy({ where: filter });
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
      const walletsFilter08579 = { 'addedBy': { [Op.in]: user } };
      const wallets83665 = await deleteWallets(walletsFilter08579);
      const trx_walletsFilter64547 = { 'addedBy': { [Op.in]: user } };
      const trx_wallets50292 = await deleteTrx_wallets(trx_walletsFilter64547);
      const trx_walletsFilter56309 = { 'updatedBy': { [Op.in]: user } };
      const trx_wallets34232 = await deleteTrx_wallets(trx_walletsFilter56309);
      const trx_receivesFilter46450 = { 'addedBy': { [Op.in]: user } };
      const trx_receives38144 = await deleteTrx_receives(trx_receivesFilter46450);
      const trx_receivesFilter16159 = { 'updatedBy': { [Op.in]: user } };
      const trx_receives62733 = await deleteTrx_receives(trx_receivesFilter16159);
      const trx_receive_detailsFilter74444 = { 'addedBy': { [Op.in]: user } };
      const trx_receive_details42159 = await deleteTrx_receive_details(trx_receive_detailsFilter74444);
      const trx_receive_detailsFilter88344 = { 'updatedBy': { [Op.in]: user } };
      const trx_receive_details32952 = await deleteTrx_receive_details(trx_receive_detailsFilter88344);
      const trx_expensesFilter31472 = { 'addedBy': { [Op.in]: user } };
      const trx_expenses26173 = await deleteTrx_expenses(trx_expensesFilter31472);
      const trx_expensesFilter45118 = { 'updatedBy': { [Op.in]: user } };
      const trx_expenses29585 = await deleteTrx_expenses(trx_expensesFilter45118);
      const trx_expense_detailsFilter34648 = { 'addedBy': { [Op.in]: user } };
      const trx_expense_details22021 = await deleteTrx_expense_details(trx_expense_detailsFilter34648);
      const trx_expense_detailsFilter85233 = { 'updatedBy': { [Op.in]: user } };
      const trx_expense_details58022 = await deleteTrx_expense_details(trx_expense_detailsFilter85233);
      const trx_bank_transfersFilter37515 = { 'addedBy': { [Op.in]: user } };
      const trx_bank_transfers88296 = await deleteTrx_bank_transfers(trx_bank_transfersFilter37515);
      const trx_bank_transfersFilter99481 = { 'updatedBy': { [Op.in]: user } };
      const trx_bank_transfers58967 = await deleteTrx_bank_transfers(trx_bank_transfersFilter99481);
      const schema_migrationsFilter19635 = { 'addedBy': { [Op.in]: user } };
      const schema_migrations36898 = await deleteSchema_migrations(schema_migrationsFilter19635);
      const schema_migrationsFilter31536 = { 'updatedBy': { [Op.in]: user } };
      const schema_migrations10576 = await deleteSchema_migrations(schema_migrationsFilter31536);
      const purchasesFilter39205 = { 'addedBy': { [Op.in]: user } };
      const purchases92772 = await deletePurchases(purchasesFilter39205);
      const purchasesFilter42677 = { 'updatedBy': { [Op.in]: user } };
      const purchases40577 = await deletePurchases(purchasesFilter42677);
      const m_virtual_accountsFilter64336 = { 'addedBy': { [Op.in]: user } };
      const m_virtual_accounts19420 = await deleteM_virtual_accounts(m_virtual_accountsFilter64336);
      const m_virtual_accountsFilter64114 = { 'updatedBy': { [Op.in]: user } };
      const m_virtual_accounts74725 = await deleteM_virtual_accounts(m_virtual_accountsFilter64114);
      const m_discountsFilter32667 = { 'addedBy': { [Op.in]: user } };
      const m_discounts62377 = await deleteM_discounts(m_discountsFilter32667);
      const m_discountsFilter73782 = { 'updatedBy': { [Op.in]: user } };
      const m_discounts63078 = await deleteM_discounts(m_discountsFilter73782);
      const m_chart_of_accountsFilter00375 = { 'addedBy': { [Op.in]: user } };
      const m_chart_of_accounts10291 = await deleteM_chart_of_accounts(m_chart_of_accountsFilter00375);
      const m_chart_of_accountsFilter77593 = { 'updatedBy': { [Op.in]: user } };
      const m_chart_of_accounts55731 = await deleteM_chart_of_accounts(m_chart_of_accountsFilter77593);
      const m_book_periodsFilter13100 = { 'addedBy': { [Op.in]: user } };
      const m_book_periods78155 = await deleteM_book_periods(m_book_periodsFilter13100);
      const m_book_periodsFilter18732 = { 'updatedBy': { [Op.in]: user } };
      const m_book_periods54461 = await deleteM_book_periods(m_book_periodsFilter18732);
      const m_bank_accountsFilter48066 = { 'addedBy': { [Op.in]: user } };
      const m_bank_accounts54653 = await deleteM_bank_accounts(m_bank_accountsFilter48066);
      const m_bank_accountsFilter28813 = { 'updatedBy': { [Op.in]: user } };
      const m_bank_accounts62189 = await deleteM_bank_accounts(m_bank_accountsFilter28813);
      const journalsFilter74007 = { 'addedBy': { [Op.in]: user } };
      const journals52397 = await deleteJournals(journalsFilter74007);
      const journalsFilter60964 = { 'updatedBy': { [Op.in]: user } };
      const journals67278 = await deleteJournals(journalsFilter60964);
      const journal_detailsFilter49853 = { 'addedBy': { [Op.in]: user } };
      const journal_details68875 = await deleteJournal_details(journal_detailsFilter49853);
      const journal_detailsFilter73545 = { 'updatedBy': { [Op.in]: user } };
      const journal_details95473 = await deleteJournal_details(journal_detailsFilter73545);
      const invoicesFilter82187 = { 'addedBy': { [Op.in]: user } };
      const invoices55690 = await deleteInvoices(invoicesFilter82187);
      const invoicesFilter30893 = { 'updatedBy': { [Op.in]: user } };
      const invoices48126 = await deleteInvoices(invoicesFilter30893);
      const general_ledgersFilter83641 = { 'addedBy': { [Op.in]: user } };
      const general_ledgers43486 = await deleteGeneral_ledgers(general_ledgersFilter83641);
      const general_ledgersFilter06842 = { 'updatedBy': { [Op.in]: user } };
      const general_ledgers70507 = await deleteGeneral_ledgers(general_ledgersFilter06842);
      const general_ledger_detailsFilter40087 = { 'addedBy': { [Op.in]: user } };
      const general_ledger_details81410 = await deleteGeneral_ledger_details(general_ledger_detailsFilter40087);
      const general_ledger_detailsFilter75303 = { 'updatedBy': { [Op.in]: user } };
      const general_ledger_details24508 = await deleteGeneral_ledger_details(general_ledger_detailsFilter75303);
      const userFilter27729 = { 'addedBy': { [Op.in]: user } };
      const user55818 = await deleteUser(userFilter27729);
      const userFilter41833 = { 'updatedBy': { [Op.in]: user } };
      const user85130 = await deleteUser(userFilter41833);
      const userAuthSettingsFilter59344 = { 'userId': { [Op.in]: user } };
      const userAuthSettings19284 = await deleteUserAuthSettings(userAuthSettingsFilter59344);
      const userTokenFilter99372 = { 'userId': { [Op.in]: user } };
      const userToken36465 = await deleteUserToken(userTokenFilter99372);
      const userRoleFilter91325 = { 'userId': { [Op.in]: user } };
      const userRole25362 = await deleteUserRole(userRoleFilter91325);
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
      const routeRoleFilter91080 = { 'roleId': { [Op.in]: role } };
      const routeRole19389 = await deleteRouteRole(routeRoleFilter91080);
      const userRoleFilter80643 = { 'roleId': { [Op.in]: role } };
      const userRole63329 = await deleteUserRole(userRoleFilter80643);
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
      const routeRoleFilter86299 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole43589 = await deleteRouteRole(routeRoleFilter86299);
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

const countSchema_migrations = async (filter) =>{
  try {
    const schema_migrationsCnt =  await Schema_migrations.count({ where:filter });
    return { schema_migrations : schema_migrationsCnt };
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

      const walletsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } }] };
      const walletsCnt =  await Wallets.countDocuments(walletsFilter);

      const trx_walletsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const trx_walletsCnt =  await Trx_wallets.countDocuments(trx_walletsFilter);

      const trx_receivesFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const trx_receivesCnt =  await Trx_receives.countDocuments(trx_receivesFilter);

      const trx_receive_detailsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const trx_receive_detailsCnt =  await Trx_receive_details.countDocuments(trx_receive_detailsFilter);

      const trx_expensesFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const trx_expensesCnt =  await Trx_expenses.countDocuments(trx_expensesFilter);

      const trx_expense_detailsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const trx_expense_detailsCnt =  await Trx_expense_details.countDocuments(trx_expense_detailsFilter);

      const trx_bank_transfersFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const trx_bank_transfersCnt =  await Trx_bank_transfers.countDocuments(trx_bank_transfersFilter);

      const schema_migrationsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const schema_migrationsCnt =  await Schema_migrations.countDocuments(schema_migrationsFilter);

      const purchasesFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const purchasesCnt =  await Purchases.countDocuments(purchasesFilter);

      const m_virtual_accountsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const m_virtual_accountsCnt =  await M_virtual_accounts.countDocuments(m_virtual_accountsFilter);

      const m_discountsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const m_discountsCnt =  await M_discounts.countDocuments(m_discountsFilter);

      const m_chart_of_accountsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const m_chart_of_accountsCnt =  await M_chart_of_accounts.countDocuments(m_chart_of_accountsFilter);

      const m_book_periodsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const m_book_periodsCnt =  await M_book_periods.countDocuments(m_book_periodsFilter);

      const m_bank_accountsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const m_bank_accountsCnt =  await M_bank_accounts.countDocuments(m_bank_accountsFilter);

      const journalsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const journalsCnt =  await Journals.countDocuments(journalsFilter);

      const journal_detailsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const journal_detailsCnt =  await Journal_details.countDocuments(journal_detailsFilter);

      const invoicesFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const invoicesCnt =  await Invoices.countDocuments(invoicesFilter);

      const general_ledgersFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const general_ledgersCnt =  await General_ledgers.countDocuments(general_ledgersFilter);

      const general_ledger_detailsFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const general_ledger_detailsCnt =  await General_ledger_details.countDocuments(general_ledger_detailsFilter);

      const userFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const userCnt =  await User.countDocuments(userFilter);

      const userAuthSettingsFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userAuthSettingsCnt =  await UserAuthSettings.countDocuments(userAuthSettingsFilter);

      const userTokenFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userTokenCnt =  await UserToken.countDocuments(userTokenFilter);

      const userRoleFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userRoleCnt =  await UserRole.countDocuments(userRoleFilter);

      let response = {
        wallets : walletsCnt,
        trx_wallets : trx_walletsCnt,
        trx_receives : trx_receivesCnt,
        trx_receive_details : trx_receive_detailsCnt,
        trx_expenses : trx_expensesCnt,
        trx_expense_details : trx_expense_detailsCnt,
        trx_bank_transfers : trx_bank_transfersCnt,
        schema_migrations : schema_migrationsCnt,
        purchases : purchasesCnt,
        m_virtual_accounts : m_virtual_accountsCnt,
        m_discounts : m_discountsCnt,
        m_chart_of_accounts : m_chart_of_accountsCnt,
        m_book_periods : m_book_periodsCnt,
        m_bank_accounts : m_bank_accountsCnt,
        journals : journalsCnt,
        journal_details : journal_detailsCnt,
        invoices : invoicesCnt,
        general_ledgers : general_ledgersCnt,
        general_ledger_details : general_ledger_detailsCnt,
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

const softDeleteSchema_migrations = async (filter,updateBody, defaultValues = {}) =>{
  try {
        
    return await Schema_migrations.update({
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
      const walletsFilter07474 = { 'addedBy': { [Op.in]: user } };
      const wallets74986 = await softDeleteWallets(walletsFilter07474,updateBody);
      const trx_walletsFilter68036 = { 'addedBy': { [Op.in]: user } };
      const trx_wallets93784 = await softDeleteTrx_wallets(trx_walletsFilter68036,updateBody);
      const trx_walletsFilter04506 = { 'updatedBy': { [Op.in]: user } };
      const trx_wallets14478 = await softDeleteTrx_wallets(trx_walletsFilter04506,updateBody);
      const trx_receivesFilter60786 = { 'addedBy': { [Op.in]: user } };
      const trx_receives15519 = await softDeleteTrx_receives(trx_receivesFilter60786,updateBody);
      const trx_receivesFilter24649 = { 'updatedBy': { [Op.in]: user } };
      const trx_receives66670 = await softDeleteTrx_receives(trx_receivesFilter24649,updateBody);
      const trx_receive_detailsFilter56247 = { 'addedBy': { [Op.in]: user } };
      const trx_receive_details66382 = await softDeleteTrx_receive_details(trx_receive_detailsFilter56247,updateBody);
      const trx_receive_detailsFilter95914 = { 'updatedBy': { [Op.in]: user } };
      const trx_receive_details29368 = await softDeleteTrx_receive_details(trx_receive_detailsFilter95914,updateBody);
      const trx_expensesFilter83050 = { 'addedBy': { [Op.in]: user } };
      const trx_expenses27575 = await softDeleteTrx_expenses(trx_expensesFilter83050,updateBody);
      const trx_expensesFilter44120 = { 'updatedBy': { [Op.in]: user } };
      const trx_expenses35497 = await softDeleteTrx_expenses(trx_expensesFilter44120,updateBody);
      const trx_expense_detailsFilter37346 = { 'addedBy': { [Op.in]: user } };
      const trx_expense_details15164 = await softDeleteTrx_expense_details(trx_expense_detailsFilter37346,updateBody);
      const trx_expense_detailsFilter12606 = { 'updatedBy': { [Op.in]: user } };
      const trx_expense_details58522 = await softDeleteTrx_expense_details(trx_expense_detailsFilter12606,updateBody);
      const trx_bank_transfersFilter61593 = { 'addedBy': { [Op.in]: user } };
      const trx_bank_transfers75981 = await softDeleteTrx_bank_transfers(trx_bank_transfersFilter61593,updateBody);
      const trx_bank_transfersFilter25508 = { 'updatedBy': { [Op.in]: user } };
      const trx_bank_transfers30370 = await softDeleteTrx_bank_transfers(trx_bank_transfersFilter25508,updateBody);
      const schema_migrationsFilter51184 = { 'addedBy': { [Op.in]: user } };
      const schema_migrations19761 = await softDeleteSchema_migrations(schema_migrationsFilter51184,updateBody);
      const schema_migrationsFilter96805 = { 'updatedBy': { [Op.in]: user } };
      const schema_migrations09126 = await softDeleteSchema_migrations(schema_migrationsFilter96805,updateBody);
      const purchasesFilter15454 = { 'addedBy': { [Op.in]: user } };
      const purchases78638 = await softDeletePurchases(purchasesFilter15454,updateBody);
      const purchasesFilter69575 = { 'updatedBy': { [Op.in]: user } };
      const purchases35973 = await softDeletePurchases(purchasesFilter69575,updateBody);
      const m_virtual_accountsFilter17507 = { 'addedBy': { [Op.in]: user } };
      const m_virtual_accounts69981 = await softDeleteM_virtual_accounts(m_virtual_accountsFilter17507,updateBody);
      const m_virtual_accountsFilter09438 = { 'updatedBy': { [Op.in]: user } };
      const m_virtual_accounts74109 = await softDeleteM_virtual_accounts(m_virtual_accountsFilter09438,updateBody);
      const m_discountsFilter08672 = { 'addedBy': { [Op.in]: user } };
      const m_discounts37025 = await softDeleteM_discounts(m_discountsFilter08672,updateBody);
      const m_discountsFilter91892 = { 'updatedBy': { [Op.in]: user } };
      const m_discounts99373 = await softDeleteM_discounts(m_discountsFilter91892,updateBody);
      const m_chart_of_accountsFilter52145 = { 'addedBy': { [Op.in]: user } };
      const m_chart_of_accounts26055 = await softDeleteM_chart_of_accounts(m_chart_of_accountsFilter52145,updateBody);
      const m_chart_of_accountsFilter60496 = { 'updatedBy': { [Op.in]: user } };
      const m_chart_of_accounts13572 = await softDeleteM_chart_of_accounts(m_chart_of_accountsFilter60496,updateBody);
      const m_book_periodsFilter55898 = { 'addedBy': { [Op.in]: user } };
      const m_book_periods02743 = await softDeleteM_book_periods(m_book_periodsFilter55898,updateBody);
      const m_book_periodsFilter41059 = { 'updatedBy': { [Op.in]: user } };
      const m_book_periods19639 = await softDeleteM_book_periods(m_book_periodsFilter41059,updateBody);
      const m_bank_accountsFilter47575 = { 'addedBy': { [Op.in]: user } };
      const m_bank_accounts96254 = await softDeleteM_bank_accounts(m_bank_accountsFilter47575,updateBody);
      const m_bank_accountsFilter84759 = { 'updatedBy': { [Op.in]: user } };
      const m_bank_accounts48233 = await softDeleteM_bank_accounts(m_bank_accountsFilter84759,updateBody);
      const journalsFilter36900 = { 'addedBy': { [Op.in]: user } };
      const journals58134 = await softDeleteJournals(journalsFilter36900,updateBody);
      const journalsFilter22867 = { 'updatedBy': { [Op.in]: user } };
      const journals54954 = await softDeleteJournals(journalsFilter22867,updateBody);
      const journal_detailsFilter33887 = { 'addedBy': { [Op.in]: user } };
      const journal_details42791 = await softDeleteJournal_details(journal_detailsFilter33887,updateBody);
      const journal_detailsFilter55795 = { 'updatedBy': { [Op.in]: user } };
      const journal_details23596 = await softDeleteJournal_details(journal_detailsFilter55795,updateBody);
      const invoicesFilter23678 = { 'addedBy': { [Op.in]: user } };
      const invoices65636 = await softDeleteInvoices(invoicesFilter23678,updateBody);
      const invoicesFilter54980 = { 'updatedBy': { [Op.in]: user } };
      const invoices38595 = await softDeleteInvoices(invoicesFilter54980,updateBody);
      const general_ledgersFilter89646 = { 'addedBy': { [Op.in]: user } };
      const general_ledgers32359 = await softDeleteGeneral_ledgers(general_ledgersFilter89646,updateBody);
      const general_ledgersFilter09422 = { 'updatedBy': { [Op.in]: user } };
      const general_ledgers83141 = await softDeleteGeneral_ledgers(general_ledgersFilter09422,updateBody);
      const general_ledger_detailsFilter21232 = { 'addedBy': { [Op.in]: user } };
      const general_ledger_details28686 = await softDeleteGeneral_ledger_details(general_ledger_detailsFilter21232,updateBody);
      const general_ledger_detailsFilter96329 = { 'updatedBy': { [Op.in]: user } };
      const general_ledger_details62380 = await softDeleteGeneral_ledger_details(general_ledger_detailsFilter96329,updateBody);
      const userFilter96974 = { 'addedBy': { [Op.in]: user } };
      const user67392 = await softDeleteUser(userFilter96974,updateBody);
      const userFilter77147 = { 'updatedBy': { [Op.in]: user } };
      const user26630 = await softDeleteUser(userFilter77147,updateBody);
      const userAuthSettingsFilter05755 = { 'userId': { [Op.in]: user } };
      const userAuthSettings37063 = await softDeleteUserAuthSettings(userAuthSettingsFilter05755,updateBody);
      const userTokenFilter69815 = { 'userId': { [Op.in]: user } };
      const userToken46006 = await softDeleteUserToken(userTokenFilter69815,updateBody);
      const userRoleFilter22731 = { 'userId': { [Op.in]: user } };
      const userRole53612 = await softDeleteUserRole(userRoleFilter22731,updateBody);
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
      const routeRoleFilter10625 = { 'roleId': { [Op.in]: role } };
      const routeRole13182 = await softDeleteRouteRole(routeRoleFilter10625,updateBody);
      const userRoleFilter55640 = { 'roleId': { [Op.in]: role } };
      const userRole25309 = await softDeleteUserRole(userRoleFilter55640,updateBody);
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
      const routeRoleFilter91633 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole71498 = await softDeleteRouteRole(routeRoleFilter91633,updateBody);
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
  deleteSchema_migrations,
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
  countSchema_migrations,
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
  softDeleteSchema_migrations,
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

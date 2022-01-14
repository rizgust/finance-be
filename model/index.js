const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.wallets = require('./wallets')(dbConnection);

db.trx_wallets = require('./trx_wallets')(dbConnection);

db.trx_receives = require('./trx_receives')(dbConnection);

db.trx_receive_details = require('./trx_receive_details')(dbConnection);

db.trx_expenses = require('./trx_expenses')(dbConnection);

db.trx_expense_details = require('./trx_expense_details')(dbConnection);

db.trx_bank_transfers = require('./trx_bank_transfers')(dbConnection);

db.schema_migrations = require('./schema_migrations')(dbConnection);

db.purchases = require('./purchases')(dbConnection);

db.m_virtual_accounts = require('./m_virtual_accounts')(dbConnection);

db.m_discounts = require('./m_discounts')(dbConnection);

db.m_chart_of_accounts = require('./m_chart_of_accounts')(dbConnection);

db.m_book_periods = require('./m_book_periods')(dbConnection);

db.m_banks = require('./m_banks')(dbConnection);

db.m_bank_accounts = require('./m_bank_accounts')(dbConnection);

db.journals = require('./journals')(dbConnection);

db.journal_details = require('./journal_details')(dbConnection);

db.invoices = require('./invoices')(dbConnection);

db.general_ledgers = require('./general_ledgers')(dbConnection);

db.general_ledger_details = require('./general_ledger_details')(dbConnection);

db.account_receiveables = require('./account_receiveables')(dbConnection);

db.account_receiveable_rules = require('./account_receiveable_rules')(dbConnection);

db.account_payables = require('./account_payables')(dbConnection);

db.account_payable_rules = require('./account_payable_rules')(dbConnection);

db.user = require('./user')(dbConnection);

db.userAuthSettings = require('./userAuthSettings')(dbConnection);

db.userToken = require('./userToken')(dbConnection);

db.role = require('./role')(dbConnection);

db.projectRoute = require('./projectRoute')(dbConnection);

db.routeRole = require('./routeRole')(dbConnection);

db.userRole = require('./userRole')(dbConnection);

db.wallets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.wallets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_wallets.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_wallets, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_wallets.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_wallets, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.trx_receives.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_receives, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_receives.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_receives, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.trx_receive_details.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_receive_details, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_receive_details.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_receive_details, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.trx_expenses.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_expenses, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_expenses.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_expenses, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.trx_expense_details.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_expense_details, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_expense_details.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_expense_details, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.trx_bank_transfers.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_bank_transfers, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.trx_bank_transfers.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.trx_bank_transfers, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.schema_migrations.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.schema_migrations, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.schema_migrations.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.schema_migrations, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.purchases.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.purchases, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.purchases.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.purchases, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.m_virtual_accounts.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_virtual_accounts, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.m_virtual_accounts.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_virtual_accounts, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.m_discounts.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_discounts, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.m_discounts.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_discounts, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.m_chart_of_accounts.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_chart_of_accounts, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.m_chart_of_accounts.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_chart_of_accounts, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.m_book_periods.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_book_periods, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.m_book_periods.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_book_periods, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.m_bank_accounts.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_bank_accounts, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.m_bank_accounts.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.m_bank_accounts, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.journals.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.journals, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.journals.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.journals, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.journal_details.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.journal_details, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.journal_details.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.journal_details, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.invoices, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.invoices.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.invoices, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.general_ledgers.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.general_ledgers, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.general_ledgers.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.general_ledgers, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.general_ledger_details.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.general_ledger_details, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.general_ledger_details.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.general_ledger_details, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userToken.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userToken, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;
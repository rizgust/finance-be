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
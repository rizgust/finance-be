const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./walletsRoutes'));
router.use(require('./trx_walletsRoutes'));
router.use(require('./trx_receivesRoutes'));
router.use(require('./trx_receive_detailsRoutes'));
router.use(require('./trx_expensesRoutes'));
router.use(require('./trx_expense_detailsRoutes'));
router.use(require('./trx_bank_transfersRoutes'));
router.use(require('./schema_migrationsRoutes'));
router.use(require('./purchasesRoutes'));
router.use(require('./m_virtual_accountsRoutes'));
router.use(require('./m_discountsRoutes'));
router.use(require('./m_chart_of_accountsRoutes'));
router.use(require('./m_book_periodsRoutes'));
router.use(require('./m_banksRoutes'));
router.use(require('./m_bank_accountsRoutes'));
router.use(require('./journalsRoutes'));
router.use(require('./journal_detailsRoutes'));
router.use(require('./invoicesRoutes'));
router.use(require('./general_ledgersRoutes'));
router.use(require('./general_ledger_detailsRoutes'));
router.use(require('./account_receiveablesRoutes'));
router.use(require('./account_receiveable_rulesRoutes'));
router.use(require('./account_payablesRoutes'));
router.use(require('./account_payable_rulesRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;

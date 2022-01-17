
const model = require('../model');
const { replaceAll } = require('../utils/common');
const authConstant = require('../constants/authConstant');

const {
  userRole, routeRole, projectRoute, role, user
} = model;
const userRoleDbService = require('../services/dbService')({ model: userRole });
const routeRoleDbService = require('../services/dbService')({ model: routeRole });
const projectRouteDbService = require('../services/dbService')({ model: projectRoute });
const roleDbService = require('../services/dbService')({ model:  role });
const userDbService = require('../services/dbService')({ model: user });

async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    for (let i = 0; i < roles.length; i++) {
      let result = await roleDbService.findOne({
        name: roles[i],
        code: roles[i].toUpperCase()
      });
      if (!result) {
        await roleDbService.createOne({
          name: roles[i],
          code: roles[i].toUpperCase(),
          weight: 1
        });
      }
    }
    console.info('Role model seeded 🍺');
  } catch (error){
    console.log('Role seeder failed.');
  }
}

async function seedProjectRoutes (routes) {
  try {
    if (routes && routes.length) {
      for (let i = 0; i < routes.length; i++) {
        const routeMethods = routes[i].methods;
        for (let j = 0; j < routeMethods.length; j++) {
          const routeObj = {
            uri: routes[i].path.toLowerCase(),
            method: routeMethods[j],
            route_name: `${replaceAll((routes[i].path).toLowerCase().substring(1), '/', '_')}`
          };
          if (routeObj.route_name){
            let result = await projectRouteDbService.findOne(routeObj);
            if (!result) {
              await projectRouteDbService.createOne(routeObj);
            }
          }
        }
      }
      console.info('ProjectRoute model seeded 🍺');
    }
  } catch (error){
    console.log('ProjectRoute seeder failed.');
  }
}

async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/aggregate',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/aggregate',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/aggregate',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wallets/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallets/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallets/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/wallets/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallets/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallets/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wallets/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_wallets/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/trx_wallets/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_wallets/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_wallets/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_receives/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receives/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receives/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receives/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/trx_receives/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receives/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receives/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receives/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receives/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receives/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receives/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receives/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receives/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_receives/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_receive_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receive_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receive_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receive_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/trx_receive_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receive_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receive_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_receive_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receive_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receive_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receive_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receive_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_receive_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_receive_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_expenses/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expenses/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expenses/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expenses/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/trx_expenses/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expenses/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expenses/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expenses/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expenses/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expenses/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expenses/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expenses/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expenses/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_expenses/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_expense_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expense_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expense_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expense_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/trx_expense_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expense_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expense_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_expense_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expense_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expense_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expense_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expense_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_expense_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_expense_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_bank_transfers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_bank_transfers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_bank_transfers/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_bank_transfers/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/trx_bank_transfers/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_bank_transfers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_bank_transfers/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/trx_bank_transfers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_bank_transfers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_bank_transfers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_bank_transfers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_bank_transfers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/trx_bank_transfers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/trx_bank_transfers/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/purchases/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/purchases/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/purchases/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/purchases/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/purchases/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/purchases/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/purchases/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/purchases/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/purchases/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/purchases/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/purchases/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/purchases/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/purchases/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/purchases/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_virtual_accounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_virtual_accounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_virtual_accounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_virtual_accounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/m_virtual_accounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_virtual_accounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_virtual_accounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_virtual_accounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_virtual_accounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_virtual_accounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_virtual_accounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_virtual_accounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_virtual_accounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_virtual_accounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_discounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_discounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_discounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_discounts/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/m_discounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_discounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_discounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_discounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_discounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_discounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_discounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_discounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_discounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_discounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_chart_of_accounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_chart_of_accounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_chart_of_accounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_chart_of_accounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/m_chart_of_accounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_chart_of_accounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_chart_of_accounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_chart_of_accounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_chart_of_accounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_chart_of_accounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_chart_of_accounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_chart_of_accounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_chart_of_accounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_chart_of_accounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_book_periods/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_book_periods/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_book_periods/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_book_periods/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/m_book_periods/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_book_periods/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_book_periods/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_book_periods/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_book_periods/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_book_periods/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_book_periods/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_book_periods/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_book_periods/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_book_periods/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_banks/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/m_banks/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_banks/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/m_banks/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/m_banks/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/m_banks/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/m_banks/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_banks/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_banks/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_banks/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_banks/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_banks/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_banks/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_banks/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_bank_accounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_bank_accounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_bank_accounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_bank_accounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/m_bank_accounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_bank_accounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_bank_accounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/m_bank_accounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_bank_accounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_bank_accounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_bank_accounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_bank_accounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/m_bank_accounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/m_bank_accounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/journals/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journals/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journals/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/journals/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/journals/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/journals/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/journals/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journals/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journals/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journals/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journals/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journals/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journals/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/journals/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/journal_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journal_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journal_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journal_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/journal_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journal_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journal_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/journal_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journal_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journal_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journal_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journal_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/journal_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/journal_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/invoices/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/invoices/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/invoices/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/invoices/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/invoices/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/invoices/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/general_ledgers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledgers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledgers/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledgers/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/general_ledgers/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledgers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledgers/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledgers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledgers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledgers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledgers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledgers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledgers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/general_ledgers/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/general_ledger_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledger_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledger_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledger_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/general_ledger_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledger_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledger_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/general_ledger_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledger_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledger_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledger_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledger_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/general_ledger_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/general_ledger_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_receiveables/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveables/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveables/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveables/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/account_receiveables/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveables/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveables/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveables/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveables/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveables/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveables/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveables/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveables/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_receiveables/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_receiveable_rules/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveable_rules/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveable_rules/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveable_rules/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/account_receiveable_rules/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveable_rules/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveable_rules/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_receiveable_rules/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveable_rules/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveable_rules/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveable_rules/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveable_rules/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_receiveable_rules/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_receiveable_rules/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_payables/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payables/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payables/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payables/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/account_payables/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payables/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payables/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payables/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payables/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payables/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payables/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payables/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payables/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_payables/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_payable_rules/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payable_rules/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payable_rules/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payable_rules/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/account_payable_rules/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payable_rules/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payable_rules/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_payable_rules/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payable_rules/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payable_rules/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payable_rules/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payable_rules/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_payable_rules/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_payable_rules/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertoken/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertoken/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertoken/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/usertoken/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertoken/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/usertoken/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertoken/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertoken/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertoken/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertoken/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertoken/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertoken/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertoken/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertoken/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/aggregate',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/aggregate',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/aggregate',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/wallets/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallets/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallets/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/trx_wallets/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_wallets/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_wallets/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_receives/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receives/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receives/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receives/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/trx_receives/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receives/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receives/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receives/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receives/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receives/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receives/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receives/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receives/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_receives/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_receive_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receive_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receive_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receive_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/trx_receive_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receive_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receive_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_receive_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receive_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receive_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receive_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receive_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_receive_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_receive_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_expenses/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expenses/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expenses/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expenses/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/trx_expenses/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expenses/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expenses/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expenses/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expenses/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expenses/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expenses/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expenses/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expenses/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_expenses/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_expense_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expense_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expense_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expense_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/trx_expense_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expense_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expense_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_expense_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expense_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expense_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expense_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expense_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_expense_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_expense_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/trx_bank_transfers/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/purchases/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/purchases/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/purchases/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/purchases/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/purchases/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/purchases/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/purchases/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/purchases/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/purchases/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/purchases/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/purchases/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/purchases/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/purchases/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/purchases/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_virtual_accounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_discounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_discounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_discounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_discounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/m_discounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_discounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_discounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_discounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_discounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_discounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_discounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_discounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_discounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_discounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_chart_of_accounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_book_periods/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_book_periods/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_book_periods/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_book_periods/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/m_book_periods/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_book_periods/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_book_periods/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_book_periods/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_book_periods/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_book_periods/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_book_periods/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_book_periods/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_book_periods/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_book_periods/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_banks/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_banks/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_banks/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_banks/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/m_banks/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_banks/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_banks/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_banks/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_banks/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_banks/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_banks/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_banks/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_banks/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_banks/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_bank_accounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_bank_accounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_bank_accounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_bank_accounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/m_bank_accounts/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_bank_accounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_bank_accounts/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/m_bank_accounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_bank_accounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_bank_accounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_bank_accounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_bank_accounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/m_bank_accounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/m_bank_accounts/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/journals/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journals/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journals/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journals/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/journals/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journals/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journals/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journals/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journals/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journals/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journals/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journals/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journals/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/journals/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/journal_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journal_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journal_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journal_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/journal_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journal_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journal_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/journal_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journal_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journal_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journal_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journal_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/journal_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/journal_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/invoices/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/invoices/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/invoices/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/general_ledgers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledgers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledgers/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledgers/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/general_ledgers/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledgers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledgers/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledgers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledgers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledgers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledgers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledgers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledgers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/general_ledgers/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/general_ledger_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledger_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledger_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledger_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/general_ledger_details/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledger_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledger_details/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/general_ledger_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledger_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledger_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledger_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledger_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/general_ledger_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/general_ledger_details/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_receiveables/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveables/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveables/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveables/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account_receiveables/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveables/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveables/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveables/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveables/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveables/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveables/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveables/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveables/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_receiveables/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_receiveable_rules/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_payables/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payables/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payables/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payables/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account_payables/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payables/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payables/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payables/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payables/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payables/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payables/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payables/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payables/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_payables/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_payable_rules/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payable_rules/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payable_rules/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payable_rules/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account_payable_rules/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payable_rules/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payable_rules/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_payable_rules/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payable_rules/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payable_rules/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payable_rules/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payable_rules/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_payable_rules/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_payable_rules/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertoken/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertoken/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertoken/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertoken/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertoken/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertoken/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertoken/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertoken/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertoken/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertoken/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertoken/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertoken/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertoken/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertoken/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'DELETE'
      },

    ];
    if (routeRoles && routeRoles.length) {
      for (let i = 0; i < routeRoles.length; i++) {
        let route = await projectRouteDbService.findOne({
          uri: routeRoles[i].route.toLowerCase(),
          method: routeRoles[i].method,
          isActive: true,
          isDeleted: false
        }, { attributes: ['id'] });
        let role = await roleDbService.findOne({
          code: (routeRoles[i].role).toUpperCase(),
          isActive: true,
          isDeleted: false 
        }, { attributes: ['id'] });
        if (route && route.id && role && role.id) {
          let routeRoleObj = await routeRoleDbService.findOne({
            roleId: role.id,
            routeId: route.id
          });
          if (!routeRoleObj) {
            await routeRoleDbService.createOne({
              roleId: role.id,
              routeId: route.id
            });
          }
        }
      };
      console.info('RouteRole model seeded 🍺');
    }
  } catch (error){
    console.log('RouteRole seeder failed.');
  }
}

async function seedUserRole (){
  try {
    let user = await userDbService.findOne({
      'username':'Jess20',
      'isActive':true,
      'isDeleted':false
    });
    let userRole = await roleDbService.findOne({
      code: 'SYSTEM_USER',
      isActive: true,
      isDeleted: false
    }, { attributes: ['id'] });
    if (user && userRole) {
      let count = await userRoleDbService.count({
        userId: user.id,
        roleId: userRole.id
      });
      if (count == 0) {
        await userRoleDbService.createOne({
          userId: user.id,
          roleId: userRole.id
        });
        console.info('user seeded 🍺');
      }
    }
    let admin = await userDbService.findOne({
      'username':'Terrence42',
      'isActive':true,
      'isDeleted':false
    });
    let adminRole = await roleDbService.findOne({
      code: 'SYSTEM_USER',
      isActive: true,
      isDeleted: false
    }, { attributes: ['id'] });
    if (admin && adminRole) {
      let count = await userRoleDbService.count({
        userId: admin.id,
        roleId: adminRole.id
      });
      if (count == 0) {
        await userRoleDbService.createOne({
          userId: admin.id,
          roleId: adminRole.id
        });
        console.info('admin seeded 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed.');
  }
}

async function seedUser () {
  try {
    let user = await userDbService.findOne({
      'username':'Jess20',
      'isActive':true,
      'isDeleted':false
    });
    if (!user || !user.isPasswordMatch('EI6zYiCyJYxlG8i')) {
      let user = {
        'password':'EI6zYiCyJYxlG8i',
        'username':'Jess20',
        'role':authConstant.USER_ROLE.User
      };
      await userDbService.createOne(user);
    }
    let admin = await userDbService.findOne({
      'username':'Terrence42',
      'isActive':true,
      'isDeleted':false
    });
    if (!admin || !admin.isPasswordMatch('ITYEf58Ucf0BThI')) {
      let admin = {
        'password':'ITYEf58Ucf0BThI',
        'username':'Terrence42',
        'role':authConstant.USER_ROLE.Admin
      };
      await userDbService.createOne(admin);
    }
    console.info('User model seeded🍺');
  } catch (error) {
    console.log('User seeder failed. ');
  }    
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
}     

module.exports = seedData;
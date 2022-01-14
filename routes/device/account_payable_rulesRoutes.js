const express = require('express');
const router = express.Router();
const account_payable_rulesController = require('../../controller/device/account_payable_rules');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/device/api/v1/account_payable_rules/create',auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.addAccount_payable_rules({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/account_payable_rules/list',auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.findAllAccount_payable_rules({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.route('/device/api/v1/account_payable_rules/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.getAccount_payable_rulesCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payable_rules/softDeleteMany',auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.softDeleteManyAccount_payable_rules(req.body.ids,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/account_payable_rules/addBulk',auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.bulkInsertAccount_payable_rules({
    body: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payable_rules/updateBulk',auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.bulkUpdateAccount_payable_rules(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
}); 
router.post('/device/api/v1/account_payable_rules/deleteMany',auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.deleteManyAccount_payable_rules(req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payable_rules/softDelete/:id',auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.softDeleteAccount_payable_rules({
    pk:req.pathParams.id,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payable_rules/partial-update/:id',auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.partialUpdateAccount_payable_rules(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.put('/device/api/v1/account_payable_rules/update/:id',auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.updateAccount_payable_rules(req.pathParams.id,req.body,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.get('/device/api/v1/account_payable_rules/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.findAccount_payable_rulesByPk(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/account_payable_rules/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.findAccount_payable_rulesByPk(req.pathParams.id, req.body).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.delete('/device/api/v1/account_payable_rules/delete/:id',auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payable_rulesController.deleteAccount_payable_rules(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
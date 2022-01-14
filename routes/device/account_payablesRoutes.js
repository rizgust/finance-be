const express = require('express');
const router = express.Router();
const account_payablesController = require('../../controller/device/account_payables');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/device/api/v1/account_payables/create',auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.addAccount_payables({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/account_payables/list',auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.findAllAccount_payables({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.route('/device/api/v1/account_payables/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.getAccount_payablesCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payables/softDeleteMany',auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.softDeleteManyAccount_payables(req.body.ids,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/account_payables/addBulk',auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.bulkInsertAccount_payables({
    body: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payables/updateBulk',auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.bulkUpdateAccount_payables(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
}); 
router.post('/device/api/v1/account_payables/deleteMany',auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.deleteManyAccount_payables(req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payables/softDelete/:id',auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.softDeleteAccount_payables({
    pk:req.pathParams.id,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/account_payables/partial-update/:id',auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.partialUpdateAccount_payables(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.put('/device/api/v1/account_payables/update/:id',auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.updateAccount_payables(req.pathParams.id,req.body,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.get('/device/api/v1/account_payables/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.findAccount_payablesByPk(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/account_payables/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.findAccount_payablesByPk(req.pathParams.id, req.body).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.delete('/device/api/v1/account_payables/delete/:id',auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  account_payablesController.deleteAccount_payables(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
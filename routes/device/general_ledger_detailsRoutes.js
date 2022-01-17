const express = require('express');
const router = express.Router();
const general_ledger_detailsController = require('../../controller/device/general_ledger_details');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/device/api/v1/general_ledger_details/create',auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.addGeneral_ledger_details({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/general_ledger_details/list',auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.findAllGeneral_ledger_details({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.route('/device/api/v1/general_ledger_details/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.getGeneral_ledger_detailsCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/general_ledger_details/softDeleteMany',auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.softDeleteManyGeneral_ledger_details(req.body.ids,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/general_ledger_details/addBulk',auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.bulkInsertGeneral_ledger_details({
    body: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/general_ledger_details/updateBulk',auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.bulkUpdateGeneral_ledger_details(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
}); 
router.post('/device/api/v1/general_ledger_details/deleteMany',auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.deleteManyGeneral_ledger_details(req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/general_ledger_details/softDelete/:id',auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.softDeleteGeneral_ledger_details({
    pk:req.pathParams.id,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/general_ledger_details/partial-update/:id',auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.partialUpdateGeneral_ledger_details(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.put('/device/api/v1/general_ledger_details/update/:id',auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.updateGeneral_ledger_details(req.pathParams.id,req.body,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.get('/device/api/v1/general_ledger_details/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.findGeneral_ledger_detailsByPk(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/general_ledger_details/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.findGeneral_ledger_detailsByPk(req.pathParams.id, req.body).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.delete('/device/api/v1/general_ledger_details/delete/:id',auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  general_ledger_detailsController.deleteGeneral_ledger_details(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
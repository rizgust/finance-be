const express = require('express');
const router = express.Router();
const trx_receivesController = require('../../controller/device/trx_receives');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/device/api/v1/trx_receives/create',auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.addTrx_receives({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/trx_receives/list',auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.findAllTrx_receives({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.route('/device/api/v1/trx_receives/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.getTrx_receivesCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/trx_receives/softDeleteMany',auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.softDeleteManyTrx_receives(req.body.ids,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/trx_receives/addBulk',auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.bulkInsertTrx_receives({
    body: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/trx_receives/updateBulk',auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.bulkUpdateTrx_receives(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
}); 
router.post('/device/api/v1/trx_receives/deleteMany',auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.deleteManyTrx_receives(req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/trx_receives/softDelete/:id',auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.softDeleteTrx_receives({
    pk:req.pathParams.id,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/trx_receives/partial-update/:id',auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.partialUpdateTrx_receives(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.put('/device/api/v1/trx_receives/update/:id',auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.updateTrx_receives(req.pathParams.id,req.body,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.get('/device/api/v1/trx_receives/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.findTrx_receivesByPk(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/trx_receives/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.findTrx_receivesByPk(req.pathParams.id, req.body).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.delete('/device/api/v1/trx_receives/delete/:id',auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  trx_receivesController.deleteTrx_receives(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
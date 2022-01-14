const express = require('express');
const router = express.Router();
const journal_detailsController = require('../../controller/device/journal_details');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/device/api/v1/journal_details/create',auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.addJournal_details({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/journal_details/list',auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.findAllJournal_details({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.route('/device/api/v1/journal_details/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.getJournal_detailsCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/journal_details/softDeleteMany',auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.softDeleteManyJournal_details(req.body.ids,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/journal_details/addBulk',auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.bulkInsertJournal_details({
    body: req.body,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/journal_details/updateBulk',auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.bulkUpdateJournal_details(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
}); 
router.post('/device/api/v1/journal_details/deleteMany',auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.deleteManyJournal_details(req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/journal_details/softDelete/:id',auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.softDeleteJournal_details({
    pk:req.pathParams.id,
    loggedInUser: req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.put('/device/api/v1/journal_details/partial-update/:id',auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.partialUpdateJournal_details(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.put('/device/api/v1/journal_details/update/:id',auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.updateJournal_details(req.pathParams.id,req.body,req.user
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});   
router.get('/device/api/v1/journal_details/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.findJournal_detailsByPk(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/journal_details/:id',auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.findJournal_detailsByPk(req.pathParams.id, req.body).then((result)=>{
    sendResponse(res,result);
  })  
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.delete('/device/api/v1/journal_details/delete/:id',auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  journal_detailsController.deleteJournal_details(req.pathParams.id,req.body,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
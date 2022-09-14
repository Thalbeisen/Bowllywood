const express = require('express');

const router = express.Router();

const franchiseRequestsCtrl = require('../controllers/franchiseRequests');

router.post('/', franchiseRequestsCtrl.addFranchiseRequest);
router.get('/accepted', franchiseRequestsCtrl.getAllAcceptedFranchiseRequests);
router.get('/:id', franchiseRequestsCtrl.getFranchiseRequestDetail);
router.get('/', franchiseRequestsCtrl.getAllFranchiseRequests);

router.patch('/delete/:id', franchiseRequestsCtrl.archiveFranchiseRequest);
router.patch('/edit/:id', franchiseRequestsCtrl.editFranchiseRequest);

module.exports = router;

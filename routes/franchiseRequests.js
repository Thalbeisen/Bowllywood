const express = require('express');

const router = express.Router();

// Controllers
const franchiseRequestsCtrl = require('../controllers/franchiseRequests');

router.post('/', franchiseRequestsCtrl.addFranchiseRequest);

module.exports = router;

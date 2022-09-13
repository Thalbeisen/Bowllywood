const express = require('express');

const router = express.Router();

// Controllers
const franchisedCtrl = require('../controllers/franchised');

// Middlewares
// const auth = require('../middlewares/auth');

// edit
router.patch('/:id', franchisedCtrl.editFranchised);
// delete
router.delete('/:id', franchisedCtrl.deleteFranchised);
// getInfos
router.get('/:id', franchisedCtrl.getFranchisedDetail);
// getList
router.get('/', franchisedCtrl.getAllFranchised);
module.exports = router;

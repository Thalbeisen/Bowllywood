const express = require('express');

const router = express.Router();

// Controllers
const franchisedCtrl = require('../controllers/franchised');

// Middlewares
const auth = require('../middlewares/auth');

// add
// router.post('/', auth, franchisedCtrl.);
// edit
// router.patch('/', auth, franchisedCtrl.);
// getInfos
router.get('/:id', franchisedCtrl.getFranchisedDetail);
// getList
router.get('/', franchisedCtrl.getAllFranchised);
// delete (archiver)
// router.delete('/', auth, franchisedCtrl.);
module.exports = router;

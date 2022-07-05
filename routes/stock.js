// requires
const express = require('express');
const router = express.Router();
const stockCtrl = require('../controllers/stock');

// set the routers for each action/methods
router.get('/', stockCtrl.getAllstock);
router.post('/create', stockCtrl.createStock);
router.post('/update', stockCtrl.updateStock);
router.post('/new_delivery', stockCtrl.createNewDelivery);
router.delete('/delete', stockCtrl.deleteStock);

module.exports = router;
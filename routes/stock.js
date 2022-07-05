// requires
const express = require('express');
const router = express.Router();
const stockCtrl = require('../controllers/stock');

// set the routers for each action/methods
router.get('/', stockCtrl.getAllstock);
router.post('/create', stockCtrl.createStockItem);
router.post('/update', stockCtrl.updateStockItem);
router.post('/update_quantity', stockCtrl.updateStockQuantity);
router.post('/new_delivery', stockCtrl.setNewDelivery);
router.delete('/delete', stockCtrl.deleteStockItem);

module.exports = router;
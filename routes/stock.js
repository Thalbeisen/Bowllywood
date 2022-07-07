// requires
const express = require('express');
const router = express.Router();
const stockCtrl = require('../controllers/stock');

// set the routers for each action/methods
router.post('/create', stockCtrl.createStockItem);
router.post('/new_delivery', stockCtrl.setNewDelivery);
router.post('/update/:id', stockCtrl.updateStockItem);
router.delete('/delete/:id', stockCtrl.deleteStockItem);
router.get('/:id', stockCtrl.getOneStock);
router.get('/', stockCtrl.getAllstock);

module.exports = router;
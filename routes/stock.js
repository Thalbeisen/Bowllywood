// requires
const express = require('express');

const router = express.Router();
const stockCtrl = require('../controllers/stock');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each action/methods
router.post('/create', stockCtrl.createStock);
router.post('/new_delivery', stockCtrl.createNewDelivery);
router.post('/update/:id', stockCtrl.updateStock);
router.patch('/extract/:id', stockCtrl.extractStock);
router.patch('/supply/:id', stockCtrl.supplyStock);
router.delete('/delete/:id', stockCtrl.deleteStock);
router.get('/:id', stockCtrl.getOneStock);
router.get('/', stockCtrl.getAllstock);
module.exports = router;

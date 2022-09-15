// requires
const express = require('express');

const router = express.Router();
const stockCtrl = require('../controllers/stock');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each action/methods
router.post('/create', auth, stockCtrl.createStock);
router.post('/new_delivery', auth, stockCtrl.createNewDelivery);
router.post('/update/:id', auth, stockCtrl.updateStock);
router.delete('/delete/:id', auth, stockCtrl.deleteStock);
router.get('/:id', auth, stockCtrl.getOneStock);
router.get('/', auth, stockCtrl.getAllstock);

module.exports = router;

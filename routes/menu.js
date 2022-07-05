// requires
const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menu');

// set the routers for each action/methods
router.get('/', menuCtrl.getMenu);
router.post('/create', menuCtrl.createMenuItem);
router.post('/update', menuCtrl.updateMenuItem);
router.delete('/delete', menuCtrl.deleteMenuItem);

module.exports = router;
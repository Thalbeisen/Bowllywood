// requires
const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menu');

// set the routers for each action/methods
router.get('/', menuCtrl.getAllMenu);
router.post('/create', menuCtrl.createMeal);
router.post('/update', menuCtrl.updateMeal);
router.delete('/delete', menuCtrl.deleteMeal);

module.exports = router;
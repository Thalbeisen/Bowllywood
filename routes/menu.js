// requires
const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menu');

// set the routers for each methods
router.post('/create', menuCtrl.createMeal);
router.post('/update/:id', menuCtrl.updateMeal);
router.delete('/delete/:id', menuCtrl.deleteMeal);
router.get('/:id', menuCtrl.getOneMeal);
router.get('/', menuCtrl.getAllMenu);

module.exports = router;
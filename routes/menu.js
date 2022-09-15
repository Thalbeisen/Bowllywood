// requires
const express = require('express');

const router = express.Router();
const menuCtrl = require('../controllers/menu');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
router.post('/create', auth, menuCtrl.createMeal);
router.post('/update/:id', auth, menuCtrl.updateMeal);
router.delete('/delete/:id', auth, menuCtrl.deleteMeal);
router.get('/:id', menuCtrl.getOneMeal);
router.get('/', menuCtrl.getAllMenu);

module.exports = router;

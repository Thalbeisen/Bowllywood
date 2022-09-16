const express = require('express');

const router = express.Router();

const restaurantCtrl = require('../controllers/restaurants');

router.post('/add', restaurantCtrl.addRestaurant);

router.get('/city/:city', restaurantCtrl.filterRestaurantFromCity);

router.get('/:id', restaurantCtrl.getRestaurantDetail);

router.get('/', restaurantCtrl.getAllRestaurant);

router.patch('/edit/:id', restaurantCtrl.editRestaurant);

module.exports = router;

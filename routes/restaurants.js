const express = require('express');

const router = express.Router();

const restaurantCtrl = require('../controllers/restaurants');

router.post('/add', restaurantCtrl.addRestaurant);

router.get('/:id', restaurantCtrl.getRestaurantDetail);

router.get('/', restaurantCtrl.getAllRestaurant);

module.exports = router;

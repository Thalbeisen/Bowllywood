// requires
const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menu');

// set the routers for each action/methods
router.get('/', menuCtrl.getAllMenu);
router.post('/create', menuCtrl.createMeal);
router.post('/update', menuCtrl.updateMeal);
router.delete('/delete', menuCtrl.deleteMeal);

// test mongoose & connxion to ddb.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/menu');
const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

module.exports = router;
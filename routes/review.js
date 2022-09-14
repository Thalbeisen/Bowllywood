// requires
const express = require('express');

const router = express.Router();
const reviewCtrl = require('../controllers/review');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each action/methods
router.post('/create', auth, reviewCtrl.createReview);
router.post('/update/:id', auth, reviewCtrl.updateReview);
router.patch('/delete/:id', auth, reviewCtrl.deleteReview);
router.get('/', reviewCtrl.getAllReview);

module.exports = router;

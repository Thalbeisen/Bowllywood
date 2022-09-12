// requires
const express = require('express');

const router = express.Router();
const reviewCtrl = require('../controllers/review');

// set the routers for each action/methods
router.post('/create', reviewCtrl.createReview);
router.post('/update/:id', reviewCtrl.updateReview);
router.delete('/delete/:id', reviewCtrl.deleteReview);
router.get('/', reviewCtrl.getAllReview);

module.exports = router;

// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
router.post('/create', auth, reservCtrl.createReserv);
router.post('/update/:id', auth, reservCtrl.updateReserv);
router.post('/delete/:id', auth, reservCtrl.deleteReserv);
router.get('/:id', auth, reservCtrl.getOneReserv);
router.get('/', auth, reservCtrl.getAllReserv);

module.exports = router;

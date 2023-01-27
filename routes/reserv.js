// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
router.post('/create', reservCtrl.createReserv); // auth, 
router.patch('/update/:id', reservCtrl.updateReserv); // auth, 
// router.patch('/cancel/:id', reservCtrl.deleteReserv); // auth, 
// router.patch('/close/:id', reservCtrl.deleteReserv); // auth, 
router.get('/:id', reservCtrl.getOneReserv); // auth, 
router.get('/', reservCtrl.getAllReserv); // auth, 

module.exports = router;

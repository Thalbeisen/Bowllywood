// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
router.post('/create', reservCtrl.createReserv); // auth, // serveur, customer 
router.patch('/update/:id', reservCtrl.updateReserv); // auth, // auth : celui qui a créé la réservation
router.patch('/cancel/:id', reservCtrl.cancelReserv); // auth, 
router.get('/:id', reservCtrl.getOneReserv); // auth, // user connecté qui regarde sa propre truc, ou serveur qui en a sélectionné un.
router.get('/', reservCtrl.getAllReserv); // auth, // que serveurs

module.exports = router;

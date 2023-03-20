// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
router.post('/create', auth, reservCtrl.createReserv); // serveur, customer 
router.patch('/update/:id', auth, reservCtrl.updateReserv); // celui qui a créé la réservation
router.patch('/cancel/:id', auth, reservCtrl.cancelReserv); 
router.get('/:id', auth, reservCtrl.getOneReserv); // user connecté qui regarde sa propre truc, ou serveur qui en a sélectionné un.
router.get('/', auth, reservCtrl.getAllReserv); // que serveurs

module.exports = router;

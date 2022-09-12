// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// set the routers for each methods
router.post('/create', reservCtrl.createReserv);
router.post('/update/:id', reservCtrl.updateReserv);
router.delete('/delete/:id', reservCtrl.deleteReserv);
router.get('/:id', reservCtrl.getOneReserv);
router.get('/', reservCtrl.getAllReserv);

module.exports = router;

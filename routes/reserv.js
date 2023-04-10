// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// middlewares
const auth = require('../middlewares/auth'),
    { permit } = require('../middlewares/permissions');

// set the routers for each methods
router.post('/create', auth, permit('ROLE_CEO', 'ROLE_WAITER', 'ROLE_USER'), reservCtrl.createReserv);
router.patch('/update/:id', auth, permit('ROLE_CEO', 'ROLE_WAITER', 'ROLE_USER'), reservCtrl.updateReserv);
router.patch('/cancel/:id', auth, permit('ROLE_CEO', 'ROLE_WAITER', 'ROLE_USER'), reservCtrl.cancelReserv); 
router.get('/admin-list/:day', auth, permit('ROLE_CEO', 'ROLE_WAITER'), reservCtrl.getAllReserv);
router.get('/day-seats/:day/:status', auth, permit('ROLE_CEO', 'ROLE_WAITER', 'ROLE_USER'), reservCtrl.getReservationByDay);
router.get('/:id', auth, permit('ROLE_CEO', 'ROLE_WAITER', 'ROLE_USER'), reservCtrl.getOneReserv);
router.get('/', auth, permit('ROLE_USER'), reservCtrl.getUserReservList);

module.exports = router;
// requires
const express = require('express');

const router = express.Router();
const reservCtrl = require('../controllers/reserv');

// middlewares
const auth = require('../middlewares/auth'),
    { permit } = require('../middlewares/permissions'),
    { ceoAUTH } = require('../middlewares/checkUserPerms');

// set the routers for each methods
router.post('/create', auth, permit('ROLE_WAITER', 'ROLE_USER'), reservCtrl.createReserv);
router.patch('/update/:id', auth, permit('ROLE_WAITER', 'ROLE_USER'), reservCtrl.updateReserv);
router.patch('/cancel/:id', auth, permit('ROLE_WAITER', 'ROLE_USER'), reservCtrl.cancelReserv); 
router.get('/:id', auth, permit('ROLE_WAITER', 'ROLE_USER'), reservCtrl.getOneReserv);
router.get('/', auth, permit('ROLE_WAITER'), reservCtrl.getAllReserv);

module.exports = router;

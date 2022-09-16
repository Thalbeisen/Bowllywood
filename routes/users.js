const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

const auth = require('../middlewares/auth');

const { ceoAUTH } = require('../middlewares/checkUserPerms');

router.get('/', auth, userController.usersList);

router.post('/add', userController.userNew);

router.get('/validate/:validationToken', userController.userValidate);

// router.get('/:id/renewlink/:uniqueString', userController.validationTokenRenew);

router.get('/:id', auth, userController.userDetails);

router.patch('/:id', auth, userController.userEdit);

router.post('/login', userController.userLogin);

router.post('/refresh', userController.refreshUserToken);

router.delete('/:id', auth, ceoAUTH, userController.userDelete);

module.exports = router;

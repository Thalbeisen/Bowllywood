const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

const auth = require('../middlewares/auth');

router.post('/add', userController.userNew);

router.get('/', auth, userController.usersList);

router.get('/:id', auth, userController.userDetails);

router.post('/login', userController.userLogin);

router.patch('/:id', auth, userController.userEdit);

router.post('/refresh', userController.refreshUserToken);

router.delete('/:id', auth, userController.userDelete);

module.exports = router;
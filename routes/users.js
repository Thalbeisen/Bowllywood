const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

const auth = require('../middlewares/auth');

const { permit } = require('../middlewares/permissions');

router.get('/', auth, userController.usersList);

router.post('/add', userController.userNew);

router.get('/validate/:validationToken', userController.userValidate);

router.get('/:id', auth, userController.userDetails);

router.patch('/:id', auth, userController.userEdit);

router.post('/login', userController.userLogin);

router.post('/refresh', userController.refreshUserToken);

router.delete('/:id', auth, permit('ROLE_ADMIN'), userController.userDelete);

module.exports = router;

const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.userIndex);

router.get('/:id', userController.userDetails);

router.post('/login', userController.userLogin);

router.post('/', userController.userCreate);

router.patch('/:id', userController.userEdit);

router.delete('/:id', userController.userDelete);

module.exports = router;

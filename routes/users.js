const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.userIndex);

router.post('/', userController.userCreate);

module.exports = router;
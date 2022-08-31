const express = require('express');

const router = express.Router();

const roleController = require('../controllers/roles');

router.get('/', roleController.rolesList);

router.post('/add', roleController.roleNew);

router.get('/:id', roleController.roleDetails);

router.delete('/:id', roleController.roleDelete);

module.exports = router;

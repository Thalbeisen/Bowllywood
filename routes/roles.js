const express = require('express');

const router = express.Router();

const roleController = require('../controllers/roles')

router.get('/', roleController.getAllRoles);

router.get('/:id/users', roleController.getUsersByRole);

module.exports = router;
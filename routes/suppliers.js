const express = require('express');

// const auth = require('../middlewares/auth');

const router = express.Router();

const supplierCtrl = require('../controllers/supplier');

router.post('/add', supplierCtrl.addSupplier);

router.get('/:id', supplierCtrl.getSupplierDetail);

router.get('/', supplierCtrl.getAllSuppliers);

module.exports = router;

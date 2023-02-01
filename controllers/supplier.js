const Supplier = require('../models/supplier');
const errors = require('../conf/errors');

const entity = 'SUPPLIER';

/**
 * Create a supplier.
 * @param {Request} req
 * @param {Response} res
 */
exports.addSupplier = async (req, res) => {
    try {
        const supplier = new Supplier({
            ...req.body,
        });
        const createSupplier = await supplier.save();
        res.status(201).json(createSupplier);
    } catch (error) {
        console.log(error);
        res.status(400).json(errors.createError(entity));
    }
};

/**
 * Retrieve a list of every supplier.
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllSuppliers = async (req, res) => {
    try {
        const allSuppliers = await Supplier.find({ deletedAt: '' });
        if (!allSuppliers) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(allSuppliers);
    } catch (error) {
        console.log(error);
        res.status(400).json(errors.listError);
    }
};

/**
 * Retrieve a specific restaurant informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getSupplierDetail = async (req, res) => {
    try {
        const supplierInfos = await Supplier.findById(req.params.id).exec();

        if (!supplierInfos) {
            res.status(404).json(errors.emptyList);
        }

        res.status(200).json(supplierInfos);
    } catch (error) {
        res.status(400).json(errors.listError);
    }
};

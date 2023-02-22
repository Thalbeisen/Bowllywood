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
 * Retrieve a list of every active supplier.
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
 * Retrieve a specific supplier's informations
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

/**
 * Edit a supplier
 * @param {Request} req
 * @param {Response} res
 */
exports.editSupplier = async (req, res) => {
    try {
        const editingSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            },
            { returnDocument: 'after' }
        );
        if (!editingSupplier) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(editingSupplier);
    } catch (error) {
        res.status(400).json(errors.updateError(entity));
    }
};

/**
 * Archive a supplier.
 * @param {Request} req
 * @param {Response} res
 */
exports.archiveSupplier = async (req, res) => {
    try {
        const archivingSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                deletedAt: Date.now(),
            },
            { returnDocument: 'after' }
        );
        if (!archivingSupplier) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(archivingSupplier);
    } catch (error) {
        res.status(400).json(errors.deleteError);
    }
};

/**
 * Delete a supplier
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteSupplier = async (req, res) => {
    try {
        const deletingSupplier = await Supplier.findByIdAndDelete(
            req.params.id,
            {
                ...req.body,
            }
        );

        res.status(204).json(deletingSupplier);
    } catch (error) {
        res.status(400).json(errors.deleteError);
    }
};

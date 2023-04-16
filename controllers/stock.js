const Stock = require('../models/stock');
const errors = require('../conf/errors');

const entity = 'STOCK';

/**
 * Create a new product to the stock list (an ingredient or transformed product etc.)
 * @param  {Request} req Use req.body to create our product. The Stock.status is calculated thanks to the quantity & the quantityLimit.
 * @param  {Response} res Use res.status 201 & 500
 */
exports.createStock = async (req, res) => {
    try {
        // set the status thanks to the given quantity
        const quantityLimit = Number(req.body.quantityLimit);
        const quantity = Number(req.body.quantity);

        // compare quantity with quantityLimit to determine the value of 'status'.
        // first, compare with 0, not with <= quantityLimit.
        if (quantity === 0) req.body.status = 'RUPTURE';
        else if (quantity <= quantityLimit) req.body.status = 'ALIMENTER';
        else if (quantity > quantityLimit) req.body.status = 'EN_STOCK';
        else req.body.status = 'EN_STOCK';

        const stockObj = {
            ...req.body,
            createdBy: req.body.userID,
        };
        delete req.body.userID;

        // create the stock
        const stock = await new Stock(stockObj).save();

        if (!stock) res.status(404).json(errors.createError(entity));

        res.status(201).json(stock);
    } catch (err) {
        res.status(400).json(errors.errorOccured + err.message);
    }
};

/**
 * get all the stock product
 * @param  {Response} res          Use the 200 & 500 status of 'res'.
 */
exports.getAllstock = async (req, res) => {
    try {
        const stocks = await Stock.find({});

        if (!stocks) res.status(404).json(errors.emptyList);

        res.status(200).json(stocks);
    } catch (err) {
        res.status(400).json(errors.errorOccured + err.message);
    }
};

/**
 * get one product from the stocks
 * @param  {Request} req Use the req.params.id to get the product we need to return.
 * @param  {Response} res Use the 201 status.
 */
exports.getOneStock = async (req, res) => {
    try {
        const stock = await Stock.findOne({ _id: req.params.id });

        if (!stock) {
            res.status(404).json(errors.emptyData(entity));
        } else {
            res.status(200).json(stock);
        }

    } catch (err) {
        res.status(400).json(errors.errorOccured + err.message);
    }
};

/**
 * Update informations of a product from Stock
 * In case the its stock is resolve, the status will be re-calculated thanks to the quantityLimit.
 *
 * @param  {Request} req         Use req.body to update our product. The Stock.status is re-calculated thanks to the given quantity & the quantityLimit.
 * @param  {Response} res         Use res.status 200 or 500.
 */
exports.updateStock = async (req, res) => {
    try {
        // set the status thanks to the given quantity
        const quantityLimit = Number(req.body.quantityLimit);
        const quantity = Number(req.body.quantity);

        // compare quantity with quantityLimit to determine the value of 'status'.
        // first, compare with 0, not with <= quantityLimit.
        if (quantity === 0) req.body.status = 'RUPTURE';
        else if (quantity <= quantityLimit) req.body.status = 'ALIMENTER';
        else if (quantity > quantityLimit) req.body.status = 'EN_STOCK';
        else req.body.status = 'EN_STOCK';

        const stockObj = {
            ...req.body,
            lastUpdateBy: req.body.userID,
        };
        delete req.body.userID;

        // get the stock & update it
        const updatedStock = await Stock.findByIdAndUpdate(
            req.params.id,
            stockObj
        );

        if (!updatedStock) res.status(404).json(errors.updateError(entity));

        // une fois updaté, redirection sur la page des détails de la recette avec message toast ?
        res.status(200).json(updatedStock);
    } catch (err) {
        res.status(400).json(errors.errorOccured + err.message);
    }
};

/**
 * ?? set a new delivery for a product
 * @param  {Request} req The request.
 * @param  {Response} res The request's response
 */
exports.createNewDelivery = (req, res) => {
    res.status(200).json({
        message: 'set a new delivery for a product',
    });
};

/**
 * delete permanently a product
 * @param  {Request} req Use the req.params.id to get the product we want to delete.
 * @param  {Response} res Use 200 & 500 status.
 */
exports.deleteStock = async (req, res) => {
    try {
        const deletedDate = await Stock.findByIdAndDelete({
            _id: req.params.id,
        });

        if (!deletedDate) res.status(400).json(errors.deleteError);

        // une fois supprimé, retour sur la liste avec msg toast ?
        res.status(200).json('Suppression réussie');
    } catch (err) {
        res.status(204).json(errors.errorOccured + err.message);
    }
};

/**
 * Supply a product in the stock (increase product quantity).
 * @param {Request} req
 * @param {Response} res
 */
exports.supplyStock = async (req, res) => {
    try {
        const supplyThisProduct = await Stock.findOne({
            _id: req.params.id,
        });

        if (!supplyThisProduct) {
            res.status(404).json(errors.updateError(entity));
        }
        const oldQuantity = Number(supplyThisProduct.quantity);
        const newQuantity = oldQuantity + Number(req.body.quantity);

        const update = await Stock.updateOne(
            {
                _id: req.params.id,
            },
            {
                $set: { quantity: newQuantity },
            }
        );
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json(errors.message);
    }
};

exports.extractStock = async (req, res) => {
    try {
        const extractThisProduct = await Stock.findOne({
            _id: req.params.id,
        });

        if (!extractThisProduct) {
            res.status(404).json(errors.updateError(entity));
        }
        const oldQuantity = Number(extractThisProduct.quantity);
        const newQuantity = oldQuantity - Number(req.body.quantity);

        const update = await Stock.updateOne(
            {
                _id: req.params.id,
            },
            {
                $set: { quantity: newQuantity },
            }
        );
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json(errors.message);
    }
};

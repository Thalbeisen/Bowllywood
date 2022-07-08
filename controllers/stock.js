const Stock = require('../models/stock');

/**
 * get all the stock product
 * @param  {Response} res          Use the 200 & 500 status of 'res'.
 */
exports.getAllstock = async (req, res) => {
    try {
        const stocks = await Stock.find({});
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json(err.message);
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

        // throw
        res.status(201).json(stock);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Create a new product to the stock list (an ingredient or transformed product etc.)
 * @param  {Request} req Use req.body to create our product. The Stock.status is calculated thanks to the quantity & the quantityLimit.
 * @param  {Response} res Use res.status 201 & 500
 */
exports.createStock = async (req, res) => {
    try {
        // set the status thanks to the given quantity
        const quantityLimit = parseInt(req.body.quantityLimit);
        const quantity = parseInt(req.body.quantity);

        // compare quantity with quantityLimit to determine the value of 'status'.
        // first, compare with 0, not with <= quantityLimit.
        if (quantity == '0') req.body.status = 'RUPTURE';
        else if (quantity <= quantityLimit) req.body.status = 'ALIMENTER';
        else if (quantity > quantityLimit) req.body.status = 'EN_STOCK';
        else req.body.status = 'EN_STOCK';

        // create the stock
        const stock = await new Stock({ ...req.body }).save();
        res.status(201).json(stock);
    } catch (err) {
        res.status(500).json(err.message);
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
        const quantityLimit = parseInt(req.body.quantityLimit);
        const quantity = parseInt(req.body.quantity);

        // compare quantity with quantityLimit to determine the value of 'status'.
        // first, compare with 0, not with <= quantityLimit.
        if (quantity == '0') req.body.status = 'RUPTURE';
        else if (quantity <= quantityLimit) req.body.status = 'ALIMENTER';
        else if (quantity > quantityLimit) req.body.status = 'EN_STOCK';
        else req.body.status = 'EN_STOCK';

        // get the stock & update it
        const update = await Stock.findOne({ _id: req.params.id }).update({
            ...req.body,
        });

        // une fois updaté, redirection sur la page des détails de la recette avec message toast ?
        res.status(201).json(update);
    } catch (err) {
        //
        res.status(500).json(err.message);
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
        /* 62c6ccc5777b4642186261d7 */
        await Stock.findByIdAndDelete({ _id: req.params.id });
        // une fois supprimé, retour sur la liste avec msg toast ?
        res.status(200).json('Suppression réussie');
    } catch (err) {
        res.status(500).json(err.message);
    }
};

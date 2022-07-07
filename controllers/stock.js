const Stock = require('../models/stock');

/**
 * get all the stock product
 * @param  {object} res          Use the 200 & 500 status of 'res'.
 * @return {object | string}     The list of every products registered in the stock's list OR an error message.
 */
exports.getAllstock = async (req, res) =>
{
    try 
    {
        var stocks = await Stock.find({});
        res.status(200).json(stocks);
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * get one product from the stocks
 * @param  {object} req Use the req.params.id to get the product we need to return.
 * @param  {object} res Use the 201 status.
 * @return {object | string}     The informations of product OR an error message.
 */
exports.getOneStock = async (req, res) =>
{
    try 
    {
        var stock = await Stock.findOne({'_id' : req.params.id});
        
        // throw 
        res.status(201).json(stock);
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * Create a new product to the stock list (an ingredient or transformed product etc.)
 * @param  {object} req Use req.body to create our product. The Stock.status is calculated thanks to the quantity & the quantityLimit.
 * @param  {object} res Use res.status 201 & 500
 * @return {object | string}     The infos of the created product OR an error message.
 */
exports.createStock = async (req, res) =>
{
    try
    {
        // set the status thanks to the given quantity
        var quantityLimit = parseInt(req.body.quantityLimit);
        var quantity = parseInt(req.body.quantity);

        // compare quantity with quantityLimit to determine the value of 'status'.
        // first, compare with 0, not with <= quantityLimit.
        if (quantity == '0')
            req.body.status = 'RUPTURE';
        else if (quantity <= quantityLimit)
            req.body.status = 'ALIMENTER';
        else if (quantity > quantityLimit)
            req.body.status = 'EN_STOCK';
        else
            req.body.status = 'EN_STOCK';

        // create the stock
        const stock = await new Stock({...req.body}).save();
        res.status(201).json(stock);
    }
    catch(err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * Update informations of a product from Stock
 * In case the its stock is resolve, the status will be re-calculated thanks to the quantityLimit.
 * 
 * @param  {object} req         Use req.body to update our product. The Stock.status is re-calculated thanks to the given quantity & the quantityLimit.
 * @param  {object} res         Use res.status 200 or 500.
 * @return {object | string}    Informations about the update state OR an error message.
 */
exports.updateStock = async (req, res) =>
{
    try
    {
        // set the status thanks to the given quantity
        var quantityLimit = parseInt(req.body.quantityLimit);
        var quantity = parseInt(req.body.quantity);

        // compare quantity with quantityLimit to determine the value of 'status'.
        // first, compare with 0, not with <= quantityLimit.
        if (quantity == '0')
            req.body.status = 'RUPTURE';
        else if (quantity <= quantityLimit)
            req.body.status = 'ALIMENTER';
        else if (quantity > quantityLimit)
            req.body.status = 'EN_STOCK';
        else
            req.body.status = 'EN_STOCK';

        // get the stock & update it
        var update = await Stock.findOne({'_id': req.params.id}).update({...req.body});

        // une fois updaté, redirection sur la page des détails de la recette avec message toast ?
        res.status(201).json(update);
    }
    catch (err)
    {
        // 
        res.status(500).json(err.message);
    }
};

/**
 * ?? set a new delivery for a product
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.createNewDelivery = (req, res) =>
{
    res.status(200).json(
    {
        message: 'set a new delivery for a product'
    });
}

/**
 * delete permanently a product
 * @param  {object} req Use the req.params.id to get the product we want to delete.
 * @param  {object} res Use 200 & 500 status.
 * @return {string}     A success OR error message.
 */
exports.deleteStock = async (req, res) =>
{
    try 
    {
        /*62c6ccc5777b4642186261d7*/
        await Stock.findByIdAndDelete({'_id': req.params.id})
        // une fois supprimé, retour sur la liste avec msg toast ?
        res.status(200).json('Suppression réussie');
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}
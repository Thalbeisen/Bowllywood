/**
 * 
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {}     
 */

const Stock = require('../models/stock');

/**
 * get all the stock product
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
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
};

/**
 * get one product from the stocks
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
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
};

/**
 * Create a new product to the stock list (an ingredient or transformed product etc.)
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.createStock = async (req, res) =>
{
    try
    {
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
 * In case the its stock is resolve
 * The status will be calculated thanks to the quantityLimit
 * 
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.updateStock = async (req, res) =>
{
    try 
    {
        var foundStock = await Stock.findOne({'_id': req.params.id});
        foundStock.update({...req.body})

        // une fois updaté, redirection sur la page des détails de la recette avec message toast ?
        res.status(200).json(updatedStock);
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
};

/**
 * delete permanently a product
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.deleteStock = (req, res) =>
{

    try 
    {
        var deletedStock = await Stock.findByIdAndDelete({'_id': req.params.id})
        // une fois supprimé, retour sur la liste avec msg toast ?
        res.status(200).json('Supperssion réussi');
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
};
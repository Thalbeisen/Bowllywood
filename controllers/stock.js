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
    var stocks = await Stock.find({});
    res.status(200).json(stocks);
};

/**
 * get one product from the stocks
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.getOneStock = (req, res) =>
{
    Stock.findOne({'_id' : req.params.id}, (err, stock) =>
    {
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la récupération !');
            return;
        }
        res.status(200).json(stock);
    });
};

/**
 * Create a new product to the stock list (an ingredient or transformed product etc.)
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.createStock = async (req, res) =>
{
    /*Stock.create(req.body, (err, justCreatedStock) =>
    {
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la création !');
            return;
        }

        // une fois créé, redirection sur la page des détails du produit ?
        res.status(200).json(
        {
            message: 'Créé ! Rendez-vous sur mongodb'
        });
    */

    try {
        const stock = new Stock({...req.body});
        await stock.save();
        res.status(201).json(stock);
    } catch(e) {

        res.status(500).json(e.message);
        // console.log(e);
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
    var foundStock = await Stock.findOne({'_id': req.params.id});

    foundStock.update({...req.body}, (err, updatedStock) =>
    {
        // si erreur, reste sur la page de modificaition de la recette avec message toast ?
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la mise à jour !');
            return;
        }

        // une fois updaté, redirection sur la page des détails de la recette avec message toast ?
        res.status(200).json(updatedStock);
    });
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
    Stock.findByIdAndDelete({'_id': req.params.id}, (err, docs) =>
    {
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la suppression !');
            return;
        }
        res.status(200).json(docs);
    });
};
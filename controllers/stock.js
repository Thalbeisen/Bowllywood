const Stock = require('../models/stock');

/**
 * get all the stock items
 */
exports.getAllstock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'get all Stock'
    });
};

/**
 * ? create an item
 */
exports.createStockItem = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Création dun Stock'
    });
};

/**
 * Update the quantity of an item
 * In case the its stock is resolve
 * The status will be calculated thanks to the quantityLimit
 */
exports.updateStockQuantity = (req, res) =>
{
    res.status(200).json(
    {
        message: 'update le status d\'un item en stock (si il est de nouveau en stock par exemple)'
    });
};

/**
 * Update all the informations of an item from Stock
 */
exports.updateStockItem = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Update dun Stock'
    });
};

/**
 * set a new delivery for an item
 */
exports.setNewDelivery = (req, res) =>
{
    res.status(200).json(
    {
        message: 'set a new delivery for an item'
    });
};

/**
 * delete permanently an item
 */
exports.deleteStockItem = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Supprimer définitivemnet un item des Stock'
    });
};
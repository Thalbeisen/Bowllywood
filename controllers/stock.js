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
exports.createStock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Création dun Stock'
    });
};

/**
 * Update all the informations of an item from Stock
 */
exports.updateStock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Update dun Stock'
    });
};

/**
 * set a new delivery for an item
 */
exports.createNewDelivery = (req, res) =>
{
    res.status(200).json(
    {
        message: 'set a new delivery for an item'
    });
};

/**
 * delete permanently an item
 */
exports.deleteStock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Supprimer définitivemnet un item des Stock'
    });
};
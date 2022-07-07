/**
 * 
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {}     
 */


/**
 * get all the stock items
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.getAllstock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'get all Stock'
    });
};

/**
 * get all the stock items
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.getOneStock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'get one Stock'
    });
};

/**
 * ? create an item
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
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
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
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
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
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
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.deleteStock = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Supprimer définitivemnet un item des Stock'
    });
};
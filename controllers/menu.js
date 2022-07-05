// get all menu
exports.getMenu = (req, res) =>
{
    console.log(req);

    res.status(200).json(
    {
        message: 'get all menu'
    });
};

// create a meal
exports.createMenuItem = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Création dun plat'
    });
};

// update a meal
exports.updateMenuItem = (req, res) =>
{
    res.status(200).json(
    {
        message: 'update dun plat'
    });
};

// delete a meal from menu
exports.deleteMenuItem = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Suppression dun plat'
    });
};
var Menu = require('./models/menu');

// get all menu
exports.getAllMenu = (req, res) =>
{
    console.log(req);

    res.status(200).json(
    {
        message: 'get all menu'
    });
};

// create a meal
exports.createMeal = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Création dun plat'
    });
};

// update a meal
exports.updateMeal = (req, res) =>
{
    res.status(200).json(
    {
        message: 'update dun plat'
    });
};

// delete a meal from menu
exports.deleteMeal = (req, res) =>
{
    res.status(200).json(
    {
        message: 'Suppression dun plat'
    });
};
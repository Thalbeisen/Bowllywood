var Menu = require('../models/menu');

// get all menu
exports.getAllMenu = (req, res) =>
{
    const filterUser = {};
    const usersList = await Menu.find(filterUser);
    res.status(200).json(usersList);
    
    // var fnCallback = function (err, docs) {console.log(err) console.log(docs) }
    // var meals = Menu.find({}, fnCallback);
    
    // var meals = await Menu.find({});
    // // console.log(meals)

    // res.status(200).json(
    // {
    //     message: 'got the all menu !'
    // });
};

// create a meal
exports.createMeal = (req, res) =>
{
    var meal = new Menu({
        name: 'Hahiti',
        category: 1,
        description: 'Loremm Ipsum',
        ingredients: [2, 5, 12, 6, 22],
        allergens: [3],
        price: '15.2',
        image: 'img_hahiti.png'
    });

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

/*exports.testGetSomefields = (req, res) =>
{
    var fnCallback = function (err, docs) 
    {
        console.log(docs)
        res.status(200).json(
        {
            message: 'get all menu'
        });
    }

    var filters = {name: 'Hahiti'}
    Menu.find(filters, 'name description' fnCallBack)
}*/
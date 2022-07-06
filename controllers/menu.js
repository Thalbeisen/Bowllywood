var Menu = require('../models/menu');

// get all menu
exports.getAllMenu = async (req, res) =>
{
    var meals = await Menu.find({});
    console.log(meals)

    res.status(200).json(
    {
        message: 'got the all menu !'
    });
}

// get one meal from the menu
exports.getOneMeal = (req, res) =>
{
    var fnCallback = function (err, meal)
    {
        res.status(200).json(
        {
            message: 'got the selected meal !'
        });
    }
    Menu.find({'_id' : "62c597644e894ead12790f21"}, 'name', fnCallback);
}

// create a meal
exports.createMeal = async (req, res) =>
{
    var meal = await Menu.create(req.body, ()=>{
        console.log(req.body);
    });
    
    res.status(200).json(
    {
        message: 'Crééé ! Rendez-vous sur mongodb'
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
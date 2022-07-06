var Menu = require('../models/menu');

// get all menu
exports.getAllMenu = async (req, res) =>
{
    /*var fnCallback = function (err, docs) {console.log(err) console.log(docs) }
    var meals = Menu.find({}, fnCallback);*/
    // tjr utiliser await dans une fn asynchrone. ici : est en dehors.
    
    var meals = await Menu.find({});
    console.log(meals)

    res.status(200).json(
    {
        message: 'got the all menu !'
    });
}

// get all menu
exports.getOneMeal = async (req, res) =>
{
    var fnCallback = function (err, docs) {
        if (err)
        {
            console.log("erreur !");
        }
        console.log(docs);
    }

    var meal = await Menu.find({'_id' : req.id}, fnCallback);

    res.status(200).json(
    {
        message: 'got the selected meal !'
    });
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

    // name: 'Hahiti',
    // category: 1,
    // description: 'Loremm Ipsum',
    // ingredients: [2, 5, 12, 6, 22],
    // allergens: [3],
    // price: '15.2',
    // image: 'img_hahiti.png'

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
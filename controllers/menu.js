var Menu = require('../models/menu');

/**
 * Get all the meals of the menu.
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {object}     List of the meals.
 */
exports.getAllMenu = async (req, res) =>
{
    var meals = await Menu.find({});
    res.status(200).json(meals);
}

/**
 * ! Passe directement dans le / sans passer par le /:id.
 * ! N'identifie pas /:id comme un paramètre. .params est vide
 * 
 * Get one meal from the menu
 * @param  {object} req The request. Get the .params.id from it.
 * @param  {object} res The request's response
 * @return {object}     The found meal
 * Use of the callBack function of the model.
 */
exports.getOneMeal = (req, res) =>
{
    /*62c6965ee53ae94e5d980c7b*/
    Menu.findOne({'_id' : req.params.id}, (err, meal) =>
    {
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la récupération !');
            return;
        }
        res.status(200).json(meal);
    });
}

/**
 * Create a meal in ddb
 * @param  {object} req The request.
 * @param  {object} res The request's response
 * @return {} 
 * 
 * Use of Model.create. Does the same thing of : new Menu({...}).save();
 */
exports.createMeal = (req, res) =>
{
    Menu.create(req.body, (err, justCreatedMeal) =>
    {
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la création !');
            return;
        }

        // une fois créé, redirection sur la page des détails de la recette ?
        res.status(200).json(
        {
            message: 'Crééé ! Rendez-vous sur mongodb'
        });
    });
};

/**
 * update a meal
 * @param  {object} req The request, use its .params.id to get the meal we want to update.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.updateMeal = async (req, res) =>
{
    var foundMeal = await Menu.findOne({'_id': req.params.id});
    
    foundMeal.update({...req.body}, (err, updatedMeal) =>
    {
        // si erreur, reste sur la page de modificaition de la recette avec message toast ?
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la mise à jour !');
            return;
        }

        // une fois updaté, redirection sur la page des détails de la recette avec message toast ?
        res.status(200).json(updatedMeal);
    });
};

/**
 * Delete a meal from menu
 * @param  {object} req The request, use .params.id to get the meal to delete.
 * @param  {object} res The request's response
 * @return {} 
 */
exports.deleteMeal = (req, res) =>
{
    Menu.findByIdAndDelete({'_id': req.params.id}, (err, docs) =>
    {
        if (err)
        {
            console.log(err)
            res.status(200).json('Erreur lors de la suppression !');
            return;
        }
        res.status(200).json(docs);
    })
};

var Menu = require('../models/menu');

/**
 * Get all the meals of the menu.
 * @param  {object} res          Use the res.status 200 & 500.
 * @return {object | string}     List of the meals OR an error message.
 */
exports.getAllMenu = async (req, res) =>
{
    try 
    {
        var meals = await Menu.find({});
        res.status(200).json(meals);
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * Get one meal from the menu.
 * @param  {object} req          Use req.params.id to get the meal we need. 
 * @param  {object} res          Use the res.status 200 & 500.
 * @return {object | string}     Informations of the meal OR an error message.
 */
exports.getOneMeal = async (req, res) =>
{
    try 
    {
        /*62c69c245821e2d5d1c1a06b*/
        const meal = await Menu.findOne({'_id' : req.params.id})
        res.status(200).json(meal);
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * Create a meal from the menu list (a bowl).
 * @param  {object} req          Create the meal with the req.body.
 * @param  {object} res          Use res.status 201 & 500.
 * @return {object | string}     The informations of the created meal OR an error message.
 * 
 * Une fois créé, redirection vers sa page de détails ?
 */
exports.createMeal = async (req, res) =>
{
    try 
    {
        const newMeal = await new Menu({...req.body}).save();
        // 'Créé ! Rendez-vous sur mongodb'
        res.status(201).json(newMeal);
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * Update a meal.
 * @param  {object} req          Get the meal to update with req.params.id, & update it with req.body.
 * @param  {object} res          Use res.status 200? & 500
 * @return {object | string}     The infos of the update state OR an error message.
 * 
 * Une fois mis à jour, redirection vers sa page de détails ?
 */
exports.updateMeal = async (req, res) =>
{
    try 
    {
        var updatedMeal = await Menu.findOne({'_id': req.params.id}).update({...req.body});
        res.status(200).json(updatedMeal);
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}

/**
 * Delete a meal from the menu.
 * @param  {object} req          Get the meal to delete with req.params.id.
 * @param  {object} res          Use res.status 200 & 500.
 * @return {object | string}     The infos of the update state OR an error message.
 */
exports.deleteMeal = async (req, res) =>
{
    try 
    {
        await Menu.findByIdAndDelete({'_id': req.params.id}) 
        res.status(200).json('Suppression réussie');
    }
    catch (err)
    {
        res.status(500).json(err.message);
    }
}
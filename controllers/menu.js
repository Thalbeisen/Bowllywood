const Menu = require('../models/menu');

/**
 * Get all the meals of the menu.
 * @param  {Response} res          Use the res.status 200 & 500.
 */
exports.getAllMenu = async (req, res) => {
    try {
        const meals = await Menu.find({});
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Get one meal from the menu.
 * @param  {Request} req          Use req.params.id to get the meal we need.
 * @param  {Response} res          Use the res.status 200 & 500.
 */
exports.getOneMeal = async (req, res) => {
    try {
        const meal = await Menu.findOne({ _id: req.params.id });
        // (traitement)
        res.status(200).json(meal);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Create a meal from the menu list (a bowl).
 * @param  {Request} req          Create the meal with the req.body.
 * @param  {Response} res          Use res.status 201 & 500.
 *
 * Une fois créé, redirection vers sa page de détails ?
 */
exports.createMeal = async (req, res) => {
    try {
        const newMeal = await new Menu({ ...req.body }).save();
        // 'Créé ! Rendez-vous sur mongodb'
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Update a meal.
 * @param  {Request} req          Get the meal to update with req.params.id, & update it with req.body.
 * @param  {Response} res          Use res.status 200? & 500
 *
 * Une fois mis à jour, redirection vers sa page de détails ?
 */
exports.updateMeal = async (req, res) => {
    try {
        const updatedMeal = await Menu.findOne({ _id: req.params.id }).update({
            ...req.body,
        });
        res.status(200).json(updatedMeal);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Delete a meal from the menu.
 * @param  {Request} req          Get the meal to delete with req.params.id.
 * @param  {Response} res          Use res.status 200 & 500.
 */
exports.deleteMeal = async (req, res) => {
    try {
        await Menu.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json('Suppression réussie');
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const Menu = require('../models/menu');
const errors = require('../conf/errors');

const entity = 'MENU';

/**
 * Create a meal from the menu list (a bowl).
 * @param  {Request} req          Create the meal with the req.body.
 * @param  {Response} res          Use res.status 201 & 500.
 *
 * Une fois créé, redirection vers sa page de détails ?
 */
exports.createMeal = async (req, res) => {
    try {
        const menuObj = {
            ...req.body,
            createdBy: req.body.userID,
        };
        delete menuObj.userID;

        const newMeal = await new Menu(menuObj).save();
        if (!newMeal) res.status(404).json(errors.createError(entity));

        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json(errors.errorOccured + err.message);
    }
};

/**
 * Get all the bowls of the menu for the administration.
 * @param  {Response} res          Use the res.status 200 & 500.
 */
exports.getAllBowls = async (req, res) => {
    try {
        const meals = await Menu.find();
        if (!meals || meals.length === 0) 
            res.status(404).json(errors.emptyList);
        else
            res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Get all the salted bowls of the menu.
 * @param  {Response} res          Use the res.status 200 & 500.
 */
exports.getSaltedBowls = async (req, res) => {
    try {
        const meals = await Menu.find({ category: 'SALE' });
        if (!meals) res.status(404).json(errors.emptyList);
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Get all the sweet bowls (desserts) of the menu.
 * @param  {Response} res          Use the res.status 200 & 500.
 */
exports.getSweetBowls = async (req, res) => {
    try {
        const meals = await Menu.find({ category: 'SUCRE' });
        if (!meals) res.status(404).json(errors.emptyList);
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Get one meal from the menu.
 * @param  {Request} req          Use req.params.id to get the meal we need.
 * @param  {Response} res          Use the res.status 200 & 500.
 */
exports.getOneMeal = async (req, res) => {
    try {
        const mealDetails = await Menu.findById({ _id: req.params.id });

        if (!mealDetails) {
            res.status(404).json({
                message: errors.emptyData(entity),
            });
        }

        res.status(200).json(mealDetails);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
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
        const menuObj = {
            ...req.body,
            lastUpdateBy: req.body.userID,
        };
        delete menuObj.userID;

        const updatedMeal = await Menu.findByIdAndUpdate(
            req.params.id,
            menuObj,
            { returnDocument: 'after' }
        );

        if (!updatedMeal) {
            res.status(404).json(errors.updateError(entity));
            return;
        }

        res.status(200).json(updatedMeal);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Delete a meal from the menu.
 * @param  {Request}  req          Get the meal to delete with req.params.id.
 * @param  {Response} res          Use res.status 200 & 500.
 */
exports.deleteMeal = async (req, res) => {
    try {
        const deletedMeal = await Menu.findByIdAndDelete(req.params.id);

        if (!deletedMeal) res.status(404).json(errors.deleteError);

        res.status(200).json('Suppression réussie');
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

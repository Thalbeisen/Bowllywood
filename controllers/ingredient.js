const Ingredient = require('../models/ingredient');
const errors = require('../conf/errors');

const entity = 'ING';

exports.getOneIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById({ _id: req.params.id });

        if (!ingredient) {
            res.status(404).json({
                message: errors.emptyData(entity),
            });
        }

        res.status(200).json(ingredient);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

exports.getAllIngredients = async (req, res) => {
    try {
        let filters = {};
        if (req.params.cat === 'SALE' || req.params.cat === 'SUCRE') {
            const { cat } = req.params;
            filters = { category: { $all: cat } };
        }
        // else : affiche tout

        const ingredients = await Ingredient.find(filters);

        if (!ingredients) res.status(404).json(errors.emptyList);
        res.status(200).json(ingredients);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

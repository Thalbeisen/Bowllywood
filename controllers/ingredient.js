const Ingredient = require('../models/ingredient');
const errors = require('../conf/errors');

const entity = 'ING';

exports.getOneIngredient = async (req, res) =>
{
    try
    {
        const ingredient = await Ingredient.findById({ _id: req.params.id });

        if (!ingredient)
        {
            res.status(404).json({
                message: errors.emptyData(entity),
            })
        }

        res.status(200).json(ingredient);
    }
    catch (err)
    {
        res.status(500).json(errors.errorOccured + err.message);
    }
}

exports.getAllIngredients = async (req, res) =>
{
    try
    {

        const {cat} = req.params;

        let filter = ''
        switch (cat) 
        {

            case 'SALE':
                filter = {category: {$all: 'SALE'}}
                break;

            case 'SUCRE':
                filter = {category: {$all: 'SUCRE'}}
                break;

            default:

        }

        const ingredients = await Ingredient.find(filter)

        if (!ingredients) res.status(404).json(errors.emptyList)
        res.status(200).json(ingredients)
    }
    catch (err)
    {
        res.status(500).json(errors.errorOccured + err.message)
    }
}

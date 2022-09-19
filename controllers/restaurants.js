const Restaurant = require('../models/restaurants');

const errors = require('../conf/errors');

const entity = 'RESTAURANT';

/**
 * Create a restaurant.
 * @param {Request} req
 * @param {Response} res
 */
exports.addRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant({
            ...req.body,
        });
        const createRestaurant = await restaurant.save();

        res.status(201).json(createRestaurant);
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

/**
 * Retrieve a list of every restaurant.
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllRestaurants = async (req, res) => {
    try {
        const allRestaurants = await Restaurant.find({});
        if (!allRestaurants) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(allRestaurants);
    } catch (error) {
        res.status(403).json(errors.listError);
    }
};

/**
 * Retrieve a specific restaurant informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getRestaurantDetail = async (req, res) => {
    try {
        const restaurantInfos = await Restaurant.findById(req.params.id).exec();

        if (!restaurantInfos) {
            res.status(404).json(errors.emptyList);
        }

        res.status(200).json(restaurantInfos);
    } catch (error) {
        res.status(403).json(errors.listError);
    }
};

/**
 * Edit a restaurant information
 * @param {Request} req
 * @param {Response} res
 */
exports.editRestaurant = async (req, res) => {
    try {
        const editingRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            },
            { returnDocument: 'after' }
        );
        if (!editingRestaurant) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(editingRestaurant);
    } catch (error) {
        res.status(403).json(errors.updateError(entity));
    }
};

/**
 * Retrieve all restaurant from the selected city.
 * @param {Request} req
 * @param {Response} res
 */
exports.filterRestaurantFromCity = async (req, res) => {
    try {
        const restaurantFromCity = await Restaurant.find({
            city: req.params.city,
        }).exec();
        if (!restaurantFromCity) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(restaurantFromCity);
    } catch (error) {
        res.status(403).json(errors.listError);
    }
};

/**
 * Archive a restaurant.
 * @param {Request} req
 * @param {Response} res
 */
exports.archiveRestaurant = async (req, res) => {
    try {
        const archivingRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                deletedAt: Date.now(),
            },
            { returnDocument: 'after' }
        );
        if (!archivingRestaurant) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(archivingRestaurant);
    } catch (error) {
        res.status(403).json(errors.deleteError);
    }
};

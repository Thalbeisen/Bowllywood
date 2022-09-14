const FranchiseRequest = require('../models/franchiseRequests');
const errors = require('../conf/errors');

const entity = 'FRANCHISE_REQUEST';

/**
 * Create a prospect request with or without authentification
 * @param {Request} req
 * @param {Response} res
 */
exports.addFranchiseRequest = async (req, res) => {
    try {
        const fanchiseRequest = new FranchiseRequest({
            ...req.body,
            user_id: req.body.userID,
        });
        const subscriptionRequest = await fanchiseRequest.save();

        res.status(201).json(subscriptionRequest);
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

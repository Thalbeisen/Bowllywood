const Prospect = require('../models/prospects');
const User = require('../models/users');
const errorsList = require('../conf/errors');

const entity = 'PROSPECT';

/**
 * Create a prospect request with or without authentification
 * @param {Request} req
 * @param {Response} res
 */
exports.createProspectRequest = async (req, res) => {
    try {
        const prospect = new Prospect({
            ...req.body,
        });
        const subscriptionRequest = await prospect.save();
        const user = await User.findOne({
            _id: req.body.userID,
        });
        // eslint-disable-next-line no-underscore-dangle
        user.franchiseRequests.push(subscriptionRequest._id);
        user.save();
        res.status(201).json(subscriptionRequest);
    } catch (error) {
        res.status(400).json(errorsList.createError(entity));
    }
};

/**
 * Retrieve a specific prospect informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getProspectRequestDetail = async (req, res) => {
    try {
        const subscriptionResquestDetail = await Prospect.findById(
            req.params.id
        ).exec();

        if (!subscriptionResquestDetail) {
            res.status(404).json(errorsList.emptyList);
        }

        res.status(200).json(subscriptionResquestDetail);
    } catch (error) {
        res.status(403).json(errorsList.listError);
    }
};

/**
 * Retrieve every prospect request
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllProspectRequest = async (req, res) => {
    try {
        const allSubscriptionResquest = await Prospect.find({});
        if (!allSubscriptionResquest) {
            res.status(404).json(errorsList.emptyList);
        }
        res.status(200).json(allSubscriptionResquest);
    } catch (error) {
        res.status(403).json(errorsList.listError);
    }
};

/**
 * Archive a prospect request
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteProspectRequest = async (req, res) => {
    try {
        const suppressSubsriptionRequest = await Prospect.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                deletedAt: Date.now(),
            }
        );
        if (!suppressSubsriptionRequest) {
            res.status(404).json(errorsList.emptyList);
        }
        res.status(200).json(suppressSubsriptionRequest);
    } catch (error) {
        res.status(403).json(errorsList.deleteError);
    }
};

/**
 * Edit a prospect request status
 * @param {Request} req
 * @param {Response} res
 */
exports.editProspectRequest = async (req, res) => {
    try {
        const changeSubscriptionRequestStatus =
            await Prospect.findByIdAndUpdate(req.params.id, {
                ...req.body,
            });
        res.status(200).json(changeSubscriptionRequestStatus);
    } catch (error) {
        res.status(403).json(errorsList.updateError);
    }
};

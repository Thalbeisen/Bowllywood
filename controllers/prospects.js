const Prospect = require('../models/prospects');
const User = require('../models/users');
const { createError } = require('../conf/errors');

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
        if (req.body?.id) {
            const user = User.findOne({
                _id: req.body.id,
            });
            user.franchiseRequests.push(subscriptionRequest.id);
        }

        res.status(201).json(subscriptionRequest);
    } catch (error) {
        res.status(400).json({
            message: createError(entity),
        });
    }
};

// Need token
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
            res.status(404).json({
                message: "Ce prospect n'existe pas",
            });
        }

        res.status(200).json(subscriptionResquestDetail);
    } catch (error) {
        res.status(403).json({
            message: "Impossible d'accéder au contenu du prospect",
        });
    }
};

// Need token

/**
 * Retrieve every prospect request
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllProspectRequest = async (req, res) => {
    try {
        const allSubscriptionResquest = await Prospect.find({});
        if (!allSubscriptionResquest) {
            res.status(404).json({
                message: 'La liste de prospect est vide',
            });
        }
        res.status(200).json(allSubscriptionResquest);
    } catch (error) {
        res.status(403).json({
            message:
                "Impossible d'accéder à la liste de toutes les demandes de prospect",
        });
    }
};

// Need token

/**
 * Suppress a prospect request
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
            res.status(404).json({
                message:
                    'Une erreur est survenue lors de la tentative de suppression',
            });
        }
        res.status(200).json(suppressSubsriptionRequest);
    } catch (error) {
        res.status(403).json({
            message:
                'Une erreur est survenue lors de la tentative de suppression',
        });
    }
};

// Need token

/**
 * Update a prospect request status and archive key
 * @param {Request} req
 * @param {Response} res
 */
exports.updateProspectRequest = async (req, res) => {
    try {
        const refuseSubscriptionRequest = await Prospect.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            }
        );
        res.status(200).json(refuseSubscriptionRequest);
    } catch (error) {
        res.status(403).json({
            message:
                'Une erreur est survenue lors de la tentative de modification',
        });
    }
};

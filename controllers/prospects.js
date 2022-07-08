const Prospect = require('../models/prospects');
const User = require('../models/users');
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
            message: 'La création du prospect a échoué',
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
        res.status(200).json(subscriptionResquestDetail);
    } catch (error) {
        res.status(403).json({
            message: "Impossible d'accéder au contenu du prospect",
        });
    }
};

// Need token

/**
 * Retrieve all prospect request from an user
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllProspectRequestFromUser = async (req, res) => {
    try {
        const allSubscriptionResquestFromUser = await Prospect.findById(
            req.params.id
        ).exec();
        res.status(200).json(allSubscriptionResquestFromUser);
    } catch (error) {
        res.status(403).json({
            message: "Impossible d'accéder aux demandes de cet utilisateur",
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
        const suppressSubsriptionRequest = await Prospect.findByIdAndDelete(
            req.params.id
        );
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

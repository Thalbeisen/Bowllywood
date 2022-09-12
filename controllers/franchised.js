const Prospect = require('../models/prospects');
const Franchised = require('../models/franchised');
// const User = require('../models/users');

/**
 * Retrieve every franchised.
 * @param {Request} req
 * @param {Response} res
 */
 exports.getAllFranchised = async (req, res) => {
    try {
        const allFranchised = await Prospect.find({ status: 'ACCEPTED'}, 'lastname firstname phone email status' ).exec();
        if (!allFranchised) {
            res.status(404).json({
                message: 'La liste de franchisés est vide',
            });
        }
        res.status(200).json(allFranchised);
    } catch (error) {
        res.status(403).json({
            message:
                "Impossible d'accéder à la liste de touts les franchisés",
        });
    }
};

// Need token
/**
 * Retrieve a specific prospect informations
 * @param {Request} req
 * @param {Response} res
 */
 exports.getFranchisedDetail = async (req, res) => {
    try {
        const subscriptionResquestDetail = await Prospect.findOne(
            { _id: req.params.id },
            'lastname firstname phone email status'
        ).exec();

        if (!subscriptionResquestDetail || subscriptionResquestDetail['status'] !== 'ACCEPTED') {
            res.status(404).json({
                message: "Ce franchisé n'existe pas",
            });
        }

        res.status(200).json(subscriptionResquestDetail);
    } catch (error) {
        res.status(403).json({
            message: "Impossible d'accéder au contenu du prospect",
        });
    }
};



/**
 * Delete a franchised.
 * @param {Request} req
 * @param {Response} res
 */
 exports.deleteFranchised = async (req, res) => {
    try {
        const deletingFranchised = await Franchised.findByIdAndDelete(
            req.params.id
        );
        if (!deletingFranchised || deletingFranchised['status'] !== 'ACCEPTED') {
            res.status(404).json({
                message:
                    'Une erreur est survenue lors de la tentative de suppression',
            });
        }
        res.status(200).json(deletingFranchised);
    } catch (error) {
        res.status(403).json({
            message:
                'Une erreur est survenue lors de la tentative de suppression',
        });
    }
};


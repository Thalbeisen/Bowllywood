const Franchised = require('../models/franchised');
// const User = require('../models/users');

/**
 * Retrieve every franchised.
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllFranchised = async (req, res) => {
    try {
        const allFranchised = await Franchised.find({});
        if (!allFranchised) {
            res.status(404).json({
                message: 'La liste de franchisés est vide',
            });
        }
        res.status(200).json(allFranchised);
    } catch (error) {
        res.status(403).json({
            message: "Impossible d'accéder à la liste de touts les franchisés",
        });
    }
};

/**
 * Retrieve a specific franchised informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getFranchisedDetail = async (req, res) => {
    try {
        const franchisedDetail = await Franchised.findById(
            req.params.id
        ).exec();

        if (!franchisedDetail) {
            res.status(404).json({
                message: "Ce franchisé n'existe pas",
            });
        }

        res.status(200).json(franchisedDetail);
    } catch (error) {
        res.status(403).json({
            message: "Impossible d'accéder au détail du franchisé",
        });
    }
};

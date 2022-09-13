const Prospect = require('../models/prospects');

/**
 * Retrieve every franchised.
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllFranchised = async (req, res) => {
    try {
        const allFranchised = await Prospect.find(
            { status: 'ACCEPTED' },
            'lastname firstname phone email status'
        ).exec();
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
        const subscriptionResquestDetail = await Prospect.findOne(
            { _id: req.params.id },
            'lastname firstname phone email status'
        ).exec();

        if (
            !subscriptionResquestDetail ||
            subscriptionResquestDetail.status !== 'ACCEPTED'
        ) {
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
        const deletingFranchised = await Prospect.findByIdAndDelete(
            req.params.id
        );
        if (!deletingFranchised || deletingFranchised.status !== 'ACCEPTED') {
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

/**
 * Edit a franchised status and archive key
 * @param {Request} req
 * @param {Response} res
 */
exports.editFranchised = async (req, res) => {
    try {
        const updateFranchised = await Prospect.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            }
        );
        if (!updateFranchised || updateFranchised.status !== 'ACCEPTED') {
            res.status(404).json({
                message: 'Aucun résultat trouvé',
            });
        }
        res.status(200).json(updateFranchised);
    } catch (error) {
        res.status(403).json({
            message:
                'Une erreur est survenue lors de la tentative de modification',
        });
    }
};

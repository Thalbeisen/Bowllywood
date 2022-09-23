const FranchiseRequest = require('../models/franchiseRequests');
const User = require('../models/users');
const errors = require('../conf/errors');

const entity = 'FRANCHISE_REQUEST';

/**
 * Create a franchise request.
 * @param {Request} req
 * @param {Response} res
 */
exports.addFranchiseRequest = async (req, res) => {
    try {
        const fanchiseRequest = new FranchiseRequest({
            ...req.body,
            // UNCOMMENT LINE BELOW ONCE LOGIN FEATURE READY
            // user_id: req.body.userID,
        });
        const subscriptionRequest = await fanchiseRequest.save();

        const user = await User.findOne({
            // UNCOMMENT LINE BELOW ONCE LOGIN FEATURE READY
            // _id: req.body.userID,
            // DELETE LINE BELOW ONCE LOGIN FEATURE READY
            _id: req.body.user_id,
        });
        // eslint-disable-next-line no-underscore-dangle
        user.franchiseContracts.push(subscriptionRequest._id);
        user.save();

        res.status(201).json(subscriptionRequest);
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

/**
 * Retrieve a specific franchise request informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getFranchiseRequestDetail = async (req, res) => {
    try {
        const franchiseResquestDetail = await FranchiseRequest.findById(
            req.params.id
        ).exec();

        if (!franchiseResquestDetail) {
            res.status(404).json(errors.emptyList);
        }

        res.status(200).json(franchiseResquestDetail);
    } catch (error) {
        res.status(403).json(errors.listError);
    }
};

/**
 * Retrieve every franchise requests
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllFranchiseRequests = async (req, res) => {
    try {
        const allFranchiseResquests = await FranchiseRequest.find({
            deletedAt: '',
        });
        if (!allFranchiseResquests) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(allFranchiseResquests);
    } catch (error) {
        res.status(403).json(errors.listError);
    }
};

/**
 * Retrieve every accepted franchise requests.
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllAcceptedFranchiseRequests = async (req, res) => {
    try {
        const allAcceptedFranchiseRequests = await FranchiseRequest.find({
            status: 'ACCEPTED',
        }).exec();
        if (!allAcceptedFranchiseRequests) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(allAcceptedFranchiseRequests);
    } catch (error) {
        res.status(403).json(errors.listError);
    }
};

/**
 * Archive a franchise request
 * @param {Request} req
 * @param {Response} res
 */
exports.archiveFranchiseRequest = async (req, res) => {
    try {
        const archiveRequest = await FranchiseRequest.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                deletedAt: Date.now(),
            },
            { returnDocument: 'after' }
        );
        if (!archiveRequest) {
            res.status(404).json(errors.emptyList);
        }
        res.status(200).json(archiveRequest);
    } catch (error) {
        res.status(403).json(errors.deleteError);
    }
};

/**
 * Edit a franchise request status
 * @param {Request} req
 * @param {Response} res
 */
exports.editFranchiseRequest = async (req, res) => {
    try {
        const editRequestStatus = await FranchiseRequest.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            },
            { returnDocument: 'after' }
        );

        if (!editRequestStatus) {
            res.status(404).json(errors.updateError(entity));
        }

        res.status(200).json(editRequestStatus);
    } catch (error) {
        res.status(403).json(errors.updateError);
    }
};

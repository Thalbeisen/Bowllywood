const Review = require('../models/review');
const errors = require('../conf/errors');

const entity = 'REVIEW';

/**
 * Create a review
 * @param  {Request} req
 * @param  {Response} res         Use res.status 201 & 500.
 *
 * Une fois créé, redirection vers liste des avis
 */
exports.createReview = async (req, res) => {
    try {
        const newReview = await new Review({ ...req.body }).save();

        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json(errors.createError(entity));
    }
};

/**
 * Retrieve every reviews
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find({ deletedAt: '' });

        if (!reviews) res.status(404).json(errors.emptyList);

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Update a Review
 * @param {Request} req
 * @param {Response} res
 */
exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, {
            ...req.body,
        });

        if (!updatedReview) res.status(404).json(errors.updateError);

        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json(errors.err.message);

        res.status(403).json(errors.updateError);
    }
};

/**
 * Returns the deletion date to check if the item has been archived
 * @param  {object}      req
 * @param  {object}      res
 * @return {Obj | null}  deletedDate    The date or Null
 */
this.getDeletedDate = async function (req, res) {
    try {
        const review = await Review.findOne({
            _id: req.params.id,
        }).exec();

        return review ? review.deletedAt : null;
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Archive a specific review
 * @param {Request} req
 * @param {Response} res

 */
exports.deleteReview = async (req, res) => {
    try {
        // check if the review has been deleted
        const deletedDate = await this.getDeletedDate(req, res);
        if (deletedDate) {
            res.status(403).json(errors.alreadyDeleted(entity));
            return;
        }

        // start the "deletion"
        const archivedReview = await Review.findByIdAndUpdate(req.params.id, {
            ...req.body,
            deletedAt: Date.now(),
        });

        if (archivedReview == null)
            res.status(404).json(errors.deleteError + errors.itemNotFound);

        if (!archivedReview) res.status(400).json(errors.deleteError);

        res.status(200).json(archivedReview);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

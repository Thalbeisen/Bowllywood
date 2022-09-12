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
        const reviews = await Review.find({});

        if (!reviews) {
            res.status(404).json(errors.emptyList);
        }

        res.status(200).json(reviews);
    } catch (err) {
        // res.status(500).json(err.message);
        res.status(403).json(errors.listError);
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

        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json(err.message);

        res.status(403).json(errors.updateError);
    }
};

/**
 * Archive a specific review
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) res.status(404).json(errors.deleteError);

        res.status(200).json(deletedReview);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

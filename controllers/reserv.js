/// ///////////// CONTROLLER //////////////////
const Reserv = require('../models/reserv');
const errors = require('../conf/errors');

const entity = 'RESERV';

/**
 * Create a reservation
 * @param  {Request} req
 * @param  {Response} res         Use res.status 201 & 500.
 *
 * Une fois créé, redirection vers page confirmation
 */
exports.createReserv = async (req, res) => {
    try {
        const newReserv = await new Reserv({ ...req.body }).save();

        res.status(201).json(newReserv);
    } catch (err) {
        res.status(400).json(errors.createError(entity));
    }
};

/**
 * Retrieve every reservations
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllReserv = async (req, res) => {
    try {
        const reservations = await Reserv.find({});

        if (!reservations) {
            res.status(404).json(errors.emptyList);
        }

        res.status(200).json(reservations);
    } catch (err) {
        // res.status(500).json(err.message);
        res.status(403).json(errors.listError);
    }
};

/**
 * Retrieve a specific reservation informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getOneReserv = async (req, res) => {
    try {
        const reservDetails = await Reserv.findOne({ _id: req.params.id });

        if (!reservDetails) {
            res.status(404).json({
                message: errors.emptyData(entity),
            });
        }

        res.status(200).json(reservDetails);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Update a Reservation
 * @param {Request} req
 * @param {Response} res
 */
exports.updateReserv = async (req, res) => {
    try {
        const updatedReserv = await Reserv.findByIdAndUpdate(req.params.id, {
            ...req.body,
        });

        res.status(200).json(updatedReserv);
    } catch (err) {
        res.status(500).json(err.message);

        res.status(403).json(errors.updateError);
    }
};

/**
 * Archive a specific reservation
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteReserv = async (req, res) => {
    try {
        const deletedReserv = await Reserv.findByIdAndDelete(req.params.id);

        if (!deletedReserv) res.status(404).json(errors.deleteError);

        res.status(200).json(deletedReserv);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

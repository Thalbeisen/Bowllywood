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
        const newReserv = await new Reserv({
            ...req.body,
        }).save();
        if (!newReserv) res.status(404).json(errors.createError(entity));

        res.status(201).json(newReserv);
    } catch (err) {
        res.status(400).json(errors.errorOccured + err.message);
    }
};

/**
 * Retrieve every reservations
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllReserv = async (req, res) => {
    try {
        const reservations = await Reserv.find({ deletedAt: '' });

        if (!reservations) res.status(404).json(errors.emptyList);

        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Retrieve a specific reservation informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getOneReserv = async (req, res) => {
    try {
        const reservDetails = await Reserv.findOne({ id: req.params.id });

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

        if (!updatedReserv) res.status(404).json(errors.updateError);

        res.status(200).json(updatedReserv);
    } catch (err) {
        res.status(500).json(err.message);

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
        const reservation = await Reserv.findOne({
            _id: req.params.id,
        }).exec();

        return reservation ? reservation.deletedAt : null;
    } catch (err) {
        res.status(500).json(err.message);
    }
};

/**
 * Archive a specific reservation
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteReserv = async (req, res) => {
    try {
        // check if the reservation has been deleted
        const deletedDate = await this.getDeletedDate(req, res);
        if (deletedDate) {
            res.status(403).json(errors.alreadyDeleted(entity));
            return;
        }

        // start the "deletion"
        const archivedReserv = await Reserv.findByIdAndUpdate(req.params.id, {
            deletedAt: Date.now(),
        });

        if (archivedReserv == null)
            res.status(404).json(errors.deleteError + errors.itemNotFound);

        if (!archivedReserv) res.status(404).json(errors.deleteError);

        res.status(200).json(archivedReserv);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

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
        const reservations = await Reserv.find();
        
        console.log(reservations)
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
        const reservation = await Reserv.findOne({ _id: req.params.id });

        if (!reservation) {
            res.status(404).json({
                message: errors.emptyData(entity),
            });
        }

        const userID = req.body.userID

        if (userID)
        {
            
        }

        /* const jwt = require('jsonwebtoken');
          require('dotenv').config();
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];

        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);*/

        /*
            get ID connected
            reservation.userID != ID connected
         */

        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Update a Reservation
 * @param {Request} req
 * @param {Response} res
 */
exports.updateReserv = async (req, res) => {
    try {
        const updatedReserv = await Reserv.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
            },
            { returnDocument: 'after' }
        );

        if (!updatedReserv) res.status(404).json(errors.updateError(entity));

        res.status(200).json(updatedReserv);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
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
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Cancel a specific reservation
 */
exports.cancelReserv = async (req, res) => {
    try {
        const canceledReserv = await Reserv.findByIdAndUpdate(req.params.id, 
            { status: 'CLD' },
            { returnDocument: 'after' }
        );

        if (!canceledReserv)
            res.status(404).json(errors.deleteError(entity) + errors.itemNotFound);

        res.status(200).json(canceledReserv);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};
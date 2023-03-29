const Reserv = require('../models/reserv');
const errors = require('../conf/errors');
const entity = 'RESERV';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const defineFilters = async (request) =>
{
    debugger
    const authHeader = request.headers.authorization,
          token = authHeader && authHeader.split(' ')[1];

    const currToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return (currToken.role === 'ROLE_USER') 
        ? { _id: request.params.id, userID: currToken.id} 
        : { _id: request.params.id, workingRestaurant_id: currToken.workingResID};
}

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
 * Retrieve every reservations of one user
 * @param {Request} req
 * @param {Response} res
 */
exports.getUserReservList = async (req, res) => {
    try {
        debugger
        const authHeader = request.headers.authorization,
              token = authHeader && authHeader.split(' ')[1];
        const currToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (res?.params?.userID === currToken.id)
          res.status(401).json(errors.forbidden)

        const reservations = await Reserv.find({restaurandID: res.params.restauID});
        
        if (!reservations) res.status(404).json(errors.emptyList);
        
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(errors.errorOccured + err.message);
    }
};

/**
 * Retrieve every reservations
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllReserv = async (req, res) => {
    try {
        debugger
        if (res?.params?.restauID !== currToken.workingResID)
          res.status(401).json(errors.forbidden)

        const reservations = await Reserv.find({restaurandID: res.params.restauID});
        
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
        debugger
        let filters = defineFilters(req)
        const reservation = await Reserv.findOne({filters});

        if (!reservation) {
            res.status(404).json({
                message: errors.emptyData(entity),
            });
        }

        // check user roles
        const userID = req.body.userID,
              roleID = req.body.roleID,
              workingResID = req.body.workingResID;

        // if user is not the one who created the reservation
        // if the restaurant != the of the employing one
        if ((roleID.constains('ROLE_USER') && userID !== reservation.userID) 
                || (roleID.constains('ROLE_WAITER') && workingResID !== reservation.restaurantID))
        {
            res.status(401).json(errors.forbidden);
            // const req.params.userID = userID;
            // const waiter = await User.userDetails(req);
            // if (waiter.workingRestaurant_id != reservation.restaurantID) {}
        }

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
        debugger
        let filters = defineFilters(req)
        const updatedReserv = await Reserv.findByIdAndUpdate(
            req.params.id,
            // ? filters
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
        debugger
        let filters = defineFilters(req) // idem que update??
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
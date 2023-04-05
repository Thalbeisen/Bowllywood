const Reserv = require('../models/reserv');
const User = require('../models/users');
const errors = require('../conf/errors');
const entity = 'RESERV';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const defineFilters = async (request) =>
{
    const connectedUser = request.body;
    const filters = (connectedUser?.roleID === 'ROLE_USER') 
        ? { _id: request?.params?.id, consumerID: connectedUser?.userID} 
        : { _id: request?.params?.id, restaurantID: connectedUser?.workingResID};
    return filters;
}

const getUserRestaurantID = async (connectedUser) => {
    let restaurantID;

    if (connectedUser.roleID === 'ROLE_USER') {
        const consumer = await User.userDetails();
        restaurantID = consumer?.favouriteRestaurant_id;
    } else {
        restaurantID = connectedUser.workingResID;
    }

    return restaurantID;
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
        const connectedUser = {
            userID: req?.body?.userID,
            roleID: req?.body?.roleID,
            workingResID: req?.body?.workingResID
        }

        // automatic filling of 'restaurantID'
        req.body.restaurantID = await getUserRestaurantID(connectedUser)
        delete req.body.userID;
        delete req.body.roleID;
        delete req.body.workingResID;

        /*if (connectedUser.roleID === 'ROLE_USER') {
            const consumer = await User.userDetails();
            req.body.restaurantID = consumer?.favouriteRestaurant_id;
        } else {
            req.body.restaurantID = connectedUser.workingResID;
            delete req.body.userID;
            delete req.body.roleID;
            delete req.body.workingResID;
        }*/

        const newReserv = await new Reserv({
            ...req.body,
        }).save();

        if (!newReserv) res.status(404).json(errors.createError(entity));

        res.status(201).json(newReserv);
    } catch (err) {
        res.status(400).json(errors.errorOccured + ' BIP ' + err.message);
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
        const reservations = await Reserv.find({customerID: res.body.userID});
        
        if (!reservations) res.status(404).json(errors.emptyList);
        
        res.status(200).json(reservations);
    } catch (err) {
        debugger
        res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
    }
};

/**
 * Retrieve every reservations
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllReserv = async (req, res) => {
    try {
        const workingResID = req.body.workingResID;

        const reservations = await Reserv.find({restaurantID: workingResID});
        if (!reservations) res.status(404).json(errors.emptyList);

        res.status(200).json(reservations);
    } catch (err) {
        debugger
        res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
    }
};

/**
 * Retrieve a specific reservation informations
 * @param {Request} req
 * @param {Response} res
 */
exports.getOneReserv = async (req, res) => {
    try {
        let filters = await defineFilters(req)
        const reservation = await Reserv.findOne(filters);

        if (!reservation)
            res.status(404).json(errors.emptyData(entity));
        else
            res.status(201).json(reservation);
    } catch (err) {
        debugger
        res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
    }
};

/**
 * Update a Reservation
 * @param {Request} req
 * @param {Response} res
 */
exports.updateReserv = async (req, res) => {
    try {
        let filters = await defineFilters(req)

        if (req?.body?.consumerID === '') delete req?.body?.consumerID;
        delete req.body.userID;
        delete req.body.roleID;
        delete req.body.workingResID;
        
        const updatedReserv = await Reserv.findOneAndUpdate(
            filters,
            {
                ...req.body,
            },
            { returnDocument: 'after' }
        );

        if (!updatedReserv) res.status(404).json(errors.updateError(entity));

        res.status(200).json(updatedReserv);
    } catch (err) {
        debugger
        res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
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
        debugger
        res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
    }
};

/**
 * Cancel a specific reservation
 */
exports.cancelReserv = async (req, res) => {
    try {
        let filters = await defineFilters(req);
        const canceledReserv = await Reserv.findOneAndUpdate(filters, 
            { status: 'CLD' },
            { returnDocument: 'after' }
        );

        if (!canceledReserv)
            res.status(404).json(errors.deleteError(entity) + errors.itemNotFound);

        res.status(200).json(canceledReserv);
    } catch (err) {
        debugger
        res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
    }
};

/**
 * Retrieve every reservations of a given day
 * @param {Request} req
 * @param {Response} res
 */
exports.getReservationByDay = async (req, res) => {
    try {
        debugger
        const connectedUser = {
            userID: req?.body?.userID,
            roleID: req?.body?.roleID,
            workingResID: req?.body?.workingResID
        }

        // get consumer fav. restaurant or working restaurant
        const restaurantID = await getUserRestaurantID(connectedUser)

        const reservationsDay = await Reserv.find({
            restaurantID: restaurantID,
            reservDate: req.params.day,
            status: 'KEPT'
        }, 'reservDate seatNr status restaurantID');

        if (!reservationsDay || reservationsDay?.length === 0) 
            res.status(404).json(errors.emptyList)
        else
            res.status(200).json(reservationsDay);
    
        } catch (err) {
            debugger
            res.status(500).json(errors.errorOccured + ' BIP ' + err.message);
    }
};
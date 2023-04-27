const Reserv = require('../models/reserv');
const User = require('../models/users');
const errors = require('../conf/errors');
const entity = 'RESERV';
const jwt = require('jsonwebtoken');
require('dotenv').config();

let nowTime = new Date().getTime()

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
        const consumer = await User.findOne({_id: connectedUser.userID});
        restaurantID = consumer?.favouriteRestaurant_id;
    } else {
        restaurantID = connectedUser.workingResID;
    }

    return restaurantID;
}

const setClosedStatus = (reservation) => {
    let reservationTime = new Date(reservation.reservDate).getTime();

    if (reservation.status !== 'CLD' && reservationTime <= nowTime)
    {
        reservation.status = 'CLS';
    }
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

        if (!req.body.consumerID) {
            delete req.body.consumerID;
        }

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
        
        const reservations = await Reserv.find({consumerID: req.body.userID});
        
        if (!reservations || reservations?.length === 0) {
            res.status(404).json(errors.emptyList);
        } else {
            debugger
            reservations.map((item, index) => {
                setClosedStatus(item)
            })

            res.status(200).json(reservations);
        }
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
        const workingResID = req.body.workingResID,
              filterDate = req?.params?.day;

        let filters = {
            restaurantID: workingResID
        }

        if (filterDate && filterDate !== 'ALL') {
            const date = new Date(filterDate)
                  start = date.setHours(0,0,0,0),
                  end = date.setHours(24,0,0,0);
            
            filters.reservDate= {$gte: start, $lt: end}
        }

        const reservations = await Reserv.find(filters);
        if (!reservations || reservations?.length === 0) {
            res.status(404).json(errors.emptyList);
        } else {
            debugger
            reservations.map((item, index) => {
                setClosedStatus(item)
            })

            res.status(200).json(reservations);
        }
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
        let filters = await defineFilters(req)
        const reservation = await Reserv.findOne(filters);

        if (!reservation) {
            res.status(404).json(errors.emptyData(entity));
        } else {
            debugger
            setClosedStatus(reservation)
            res.status(201).json(reservation);
        }
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
        let filters = await defineFilters(req);
        const canceledReserv = await Reserv.findOneAndUpdate(filters, 
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

/**
 * Retrieve every reservations of a given day
 * @param {Request} req
 * @param {Response} res
 */
exports.getReservationByDay = async (req, res) => {
    try {
        const connectedUser = {
            userID: req?.body?.userID,
            roleID: req?.body?.roleID,
            workingResID: req?.body?.workingResID
        }

        // get consumer fav. restaurant or working restaurant
        const restaurantID = await getUserRestaurantID(connectedUser)

        const filterDate = new Date(req?.params?.day),
              filterStatus = req?.params?.status,
              start = filterDate.setHours(0,0,0,0),
              end = filterDate.setHours(24,0,0,0);

        let filters = {
            restaurantID: restaurantID,
            reservDate: {$gte: start, $lt: end}
        }

        if (filterStatus && filterStatus !== 'ALL') {
            filters.status=filterStatus;
        }
              
        const reservationsDay = await Reserv.find(filters, 'reservDate seatNr status restaurantID');

        if (!reservationsDay || reservationsDay?.length === 0) 
            res.status(404).json(errors.emptyList)
        else
            res.status(200).json(reservationsDay);
    
        } catch (err) {
            res.status(500).json(errors.errorOccured + err.message);
    }
};
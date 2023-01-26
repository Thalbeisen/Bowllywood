const KitchenCalendar = require('../models/kitchenCalendar');
const User = require('../models/users');
const errors = require('../conf/errors');

const entity = 'EVENT';

exports.addNewEvent = async (req, res) => {
    try {
        const newEvent = new KitchenCalendar({
            ...req.body,
            user_id: req.body.userID,
        });
        const eventAddRequest = await newEvent.save();
        res.status(201).json(eventAddRequest);
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await KitchenCalendar.find({});
        if (!events) {
            res.status(404).json({
                message: 'Aucun évènement trouvé',
            });
        }
        const listEvents = JSON.parse(JSON.stringify(events));
        const user = await User.findOne({ _id: events.title });
        listEvents.forEach((event) => {
            // eslint-disable-next-line no-param-reassign
            event.firstName = user.firstName;
            // eslint-disable-next-line no-param-reassign
            event.lastName = user.lastName;
        });
        res.status(200).send({
            data: listEvents,
        });
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

exports.eventEdit = async (req, res) => {
    let id = req.body.eventID;
    if (req.params?.eventID) {
        id = req.params.eventID;
    }
    try {
        const selectedEvent = await KitchenCalendar.findOne({ _id: id });
        if (!selectedEvent) {
            res.status(404).json({
                message: 'Aucun évènement trouvé avec cet ID',
            });
        }
        await KitchenCalendar.updateOne(
            { _id: req.params.eventID },
            { ...req.body }
        );
        res.status(200).json({
            message: 'Modification effetuée',
        });
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

exports.eventDelete = async (req, res) => {
    try {
        const selectedEvent = await KitchenCalendar.findOne({
            _id: req.params.eventID,
        });
        if (!selectedEvent) {
            res.status(404).json({
                message: 'Aucun évènement trouvé pour cet ID',
            });
        }
        await KitchenCalendar.findOneAndDelete({
            _id: req.params.eventID,
        });
        res.status(200).json({
            message: 'Evenement supprimé avec succès',
        });
    } catch (error) {
        res.status(400).json(errors.createError(entity));
    }
};

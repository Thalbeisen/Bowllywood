const mongoose = require('mongoose');

const { Schema } = mongoose;

const kitchenCalendarSchema = new Schema({
    eventStart: {
        type: Date,
        required: true,
    },
    eventEnd: {
        type: Date,
        required: true,
    },
    eventPeople: {
        type: String,
        required: true,
    },
    eventColor: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('KitchenCalendar', kitchenCalendarSchema);

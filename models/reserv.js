const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservSchema = new Schema(
    {
        reservName: {
            type: String,
            required: true,
        },
        reservPhone: {
            type: String,
            required: false,
        },
        reservDate: {
            type: Date,
            required: true,
        },
        seatNr: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['KEPT', 'CLD', 'CLS'],
            default: 'KEPT',
            required: true,
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        restaurantID: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        type: {
            type: String,
            enum: ['INDOOR', 'WEB'],
            default: 'WEB',
            required: true,
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
        strictQuery: false
    }
);

module.exports = mongoose.model('Reserv', reservSchema);

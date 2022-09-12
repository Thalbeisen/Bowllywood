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
            required: true,
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
            enum: ['EN_COURS', 'ANNULE', 'TERMINE'],
            default: 'EN_COURS',
            required: true,
        },
        // si le client a passé commande en ligne ou si le retrouve avec son n° de tel
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        type: {
            type: String,
            enum: ['PHONE', 'WEB'], // si le client a appelé le restau ou s'il a réservé en ligne
            default: 'WEB',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 1800,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
        deletedAt: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Reserv', reservSchema);

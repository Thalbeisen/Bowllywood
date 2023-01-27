const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservSchema = new Schema(
    {
        reservName: {
            type: String,
            required: true,
        },
        // si le client a passé commande en ligne
        reservPhone: {
            type: String
,            required: false,
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
        // si le client a passé commande en ligne
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        type: {
            type: String,
            enum: ['INDOOR', 'WEB'], // si c'est serveur ou client (en ligne) qui a créé la séservation
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
    }
);

module.exports = mongoose.model('Reserv', reservSchema);

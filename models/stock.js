const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockSchema = new Schema(
    {
        ref: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        quantityLimit: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['RAW', 'TRANS'],
            default: 'RAW',
            required: true,
        },
        sheepmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['EN_STOCK', 'ALIMENTER', 'RUPTURE'],
            default: 'EN_STOCK',
            required: true,
        },
        supplier: {
            type: String,
            required: true,
        },
        DLC: {
            type: Date,
            required: true,
        },
        transformedProduct: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Stock', stockSchema);

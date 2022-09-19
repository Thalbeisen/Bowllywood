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
        restaurantID: {
            type: Schema.Types.ObjectId,
            ref: 'restaurant',
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        lastUpdateBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Stock', stockSchema);

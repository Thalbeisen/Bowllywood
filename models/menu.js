const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['SALE', 'SUCRE'],
            default: 'SALE',
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        ingredients: {
            type: Array,
            required: false,
        },
        allergens: {
            type: Array,
            required: false,
        },
        price: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
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

module.exports = mongoose.model('Menu', menuSchema);

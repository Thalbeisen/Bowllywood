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
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Menu', menuSchema);

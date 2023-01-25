const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        category: {
            type: Array,
            default: ['SALE'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Ingredient', ingSchema);
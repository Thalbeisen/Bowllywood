const mongoose = require('mongoose');

const { Schema } = mongoose;
const prospectSchema = new Schema(
    {
        lastname: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            require: true,
        },
        estimatedAmount: {
            type: Number,
            require: true,
        },
        hopedFinancing: {
            type: Number,
            require: true,
        },
        shopLocation: {
            type: String,
            require: true,
        },
        foodServiceExperience: {
            type: Number,
            require: true,
        },
        conditionOfUse: {
            type: Boolean,
            require: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'REFUSED', 'ACCEPTED'],
            default: 'PENDING',
            require: true,
        },
        archive: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Prospect', prospectSchema);

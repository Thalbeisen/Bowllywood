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
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        estimatedAmount: {
            type: Number,
            required: true,
        },
        hopedFinancing: {
            type: Number,
            required: true,
        },
        shopLocation: {
            type: String,
            required: true,
        },
        foodServiceExperience: {
            type: Number,
            required: true,
        },
        conditionOfUse: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'REFUSED', 'ACCEPTED'],
            default: 'PENDING',
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

module.exports = mongoose.model('Prospect', prospectSchema);

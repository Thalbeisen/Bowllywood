const mongoose = require('mongoose');

const { Schema } = mongoose;
const supplierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: true,
        },
        zipcode: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        website: {
            type: String,
            required: false,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
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

module.exports = mongoose.model('Supplier', supplierSchema);

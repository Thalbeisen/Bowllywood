const mongoose = require('mongoose');

const { Schema } = mongoose;
const restaurantSchema = new Schema(
    {
        adress: {
            type: String,
            required: true,
        },
        sundayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        sundayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        mondayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        mondayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        tuesdayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        tuesdayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        wednesdayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        wednesdayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        thursdayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        thursdayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        fridayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: true,
        },
        fridayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        saturdayOpeningTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        saturdayClosingTime: {
            type: String,
            default: 'Fermé',
            required: false,
        },
        phone: {
            type: String,
            required: true,
        },
        facilities: {
            type: String,
            enum: ['BASIC', 'INTERMEDIATE', 'ADVANCED'],
            default: 'BASIC',
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
        pmrAccess: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);

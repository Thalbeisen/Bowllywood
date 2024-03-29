const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        restaurantID: {
            type: Schema.Types.ObjectId,
            ref: 'restaurant',
            required: true,
        },
        mark: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            minLength: 2,
            maxLength: 500,
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

module.exports = mongoose.model('review', reviewSchema);

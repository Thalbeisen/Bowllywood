const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        franchisedID: {
            // type: Schema.Types.ObjectId,
            type: Number,
            // ref: 'Franchised',
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

module.exports = mongoose.model('review', reviewSchema);

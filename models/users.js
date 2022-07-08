const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        lastName: {
            type: String,
            required: true,
        },

        firstName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        dbId: {
            type: String,
            required: false,
        },

        isActive: {
            type: Boolean,
            required: false,
        },

        token: {
            type: String,
        },

        refreshToken: {
            type: String,
        },

        franchiseRequests: [
            {
                // Clé étrangère
                type: Schema.Types.ObjectId,
                ref: 'Prospect',
            },
        ],
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);

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

        isVerified: {
            type: Boolean,
            default: false,
        },

        franchiseContracts: [
            {
                // Clé étrangère
                type: Schema.Types.ObjectId,
                ref: 'FranchiseRequest',
            },
        ],
        
        userValidationToken: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);

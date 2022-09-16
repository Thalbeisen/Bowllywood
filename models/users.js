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

        userRole: {
            type: String,
            required: true,
            enum: [
                'ROLE_USER',
                'ROLE_WAITER',
                'ROLE_MANAGER',
                'ROLE_COOK',
                'ROLE_CEO',
                'ROLE_ADMIN',
                'ROLE_SUPERADMIN',
            ],
            default: 'ROLE_USER',
        },

        franchiseContracts: [
            {
                // Clé étrangère
                type: Schema.Types.ObjectId,
                ref: 'FranchiseRequest',
            },
        ],
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);

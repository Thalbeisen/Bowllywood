const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Schema } = mongoose

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
        unique: true
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
        type: String
    },

    refreshToken: {
        type: String
    },
},

{
    timestamps: true,
}

);

module.exports = mongoose.model('User', userSchema)
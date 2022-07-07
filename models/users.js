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

userSchema.methods.generateMainToken = function() {
    const User = this;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const mainToken = jwt.sign({ _id: User._id }, secret, {
        expiresIn: '2m'
    })
    User.token = mainToken;
}

userSchema.methods.generateRefreshToken = function() {
    const User = this;
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const refreshToken = jwt.sign({ _id: User._id }, secret, {
        expiresIn: '5m'
    })
    User.refreshToken = refreshToken;
}

module.exports = mongoose.model('User', userSchema)
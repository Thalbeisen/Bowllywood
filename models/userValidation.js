const mongoose = require('mongoose');

const { Schema } = mongoose;

const userValidationSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    uniqueString: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1800,
    },
});

module.exports = mongoose.model('UserValidation', userValidationSchema);

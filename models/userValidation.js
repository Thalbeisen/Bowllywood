const mongoose = require('mongoose');

const { Schema } = mongoose;

const userValidationSchema = new Schema({
    uniqueString: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Penser à modifier le temps d'expiration
        expires: 600,
    },
});

module.exports = mongoose.model('UserValidation', userValidationSchema);

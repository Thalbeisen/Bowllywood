const mongoose = require('mongoose');

const { Schema } = mongoose;
const franchiseRequestSchema = new Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        estimatedAmount: {
            type: Number,
            required: true,
        },
        hopedFinancing: {
            type: Number,
            required: true,
        },
        shopLocation: {
            type: String,
            required: true,
        },
        foodServiceExperience: {
            type: Number,
            required: true,
        },
        conditionOfUse: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'REFUSED', 'ACCEPTED'],
            default: 'PENDING',
            required: true,
        },
        deletedAt: {
            type: Date,
            required: false,
        },
        user_id: {
            // Clé étrangère
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('FranchiseRequest', franchiseRequestSchema);

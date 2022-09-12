const mongoose = require('mongoose');

const { Schema } = mongoose;
const franchisedSchema = new Schema(
    {
        lastname: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        validatedProspect: [
            {
                // Clé étrangère rôles
                type: Schema.Types.ObjectId,
                ref: 'Prospect',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Franchised', franchisedSchema);

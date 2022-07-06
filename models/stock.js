const mongoose = require('mongoose');
const {Schema} = mongoose;

const stockSchema = new Schema(
{
    ref:
    {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    quantity:
    {
        type: String,
        required: true
    },
    quantityLimit:
    {
        type: String,
        required: true
    },
    type:
    {
        type: Number,
        required: true
    },
    sheepmentDate:
    {
        type: Date,
        required: true
    },
    statut:
    {
        type: Number,
        required: true
    },
    supplier:
    {
        type: String,
        required: true
    },
    DLC:
    {
        type: Date,
        required: true
    },
    updatedAt:
    {
        type: Date,
        required: false
    },
    transformedProduct:
    {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('stock', stockSchema);
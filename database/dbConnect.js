const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://Eloise_STOML:B0wllyw00d@clusterbowl.uhkam.mongodb.net/bowllywooddb?retryWrites=true&w=majority')

module.exports = db
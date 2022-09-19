const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DATABASE_URI);

module.exports = db;

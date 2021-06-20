const mongoose = require('mongoose');

const economySchema = new mongoose.Schema({
    user: String,
    guild: String,
    cash: Number,
    bank: Number,
    total: Number
})

module.exports = mongoose.models['economy'] || mongoose.model('economy', economySchema, 'economy');
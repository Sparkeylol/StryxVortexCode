const mongoose = require('mongoose');

const memberCounterSchema = new mongoose.Schema({
    groupid: String,
    creator: String,
    currentCount: Number,
    webhook: String,
    goal: String,
    emoji: String,
    text: String
})

module.exports = mongoose.models['membercounter'] || mongoose.model('membercounter', memberCounterSchema, 'membercounter');
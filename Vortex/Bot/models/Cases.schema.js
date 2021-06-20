const mongoose = require('mongoose');

const casesSchema = new mongoose.Schema({
    date: Date,
    user: String,
    reason: String,
    caseid: Number,
    resmod: String,
    offender: String,
    type: String
})

module.exports = mongoose.models['cases'] || mongoose.model('cases', casesSchema, 'cases');


const mongoose = require('mongoose');

const casesSchema = new mongoose.Schema({
    date: Date,
    caseid: Number,
    resmod: String,
    type: String
})

module.exports = mongoose.models['cases'] || mongoose.model('cases', casesSchema, 'cases');


const mongoose = require('mongoose');

const codesSchema = new mongoose.Schema({
    code: String,
    months: Number
})

module.exports = mongoose.models['codes'] || mongoose.model('codes', codesSchema, 'codes');
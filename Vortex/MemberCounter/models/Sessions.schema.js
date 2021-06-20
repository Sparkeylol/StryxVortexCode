const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    expires: Date,
    sessionToken: String,
    accessToken: String,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.models['sessions'] || mongoose.model('sessions', sessionsSchema, 'sessions');
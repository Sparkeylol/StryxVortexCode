const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    compoundId: String,
    userId: mongoose.SchemaTypes.ObjectId,
    providerType: String,
    providerId: String,
    providerAccountId: String,
    refreshToken: String,
    accessToken: String,
    accessTokenExpires: Date,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.models['accounts'] || mongoose.model('accounts', accountSchema, 'accounts');
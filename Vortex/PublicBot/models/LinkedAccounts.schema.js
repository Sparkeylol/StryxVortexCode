const mongoose = require('mongoose');

const linkedAccountsSchema = new mongoose.Schema({
    discordId: String,
    robloxId: String
})

module.exports = mongoose.models['linked'] || mongoose.model('linked', linkedAccountsSchema, 'linked');
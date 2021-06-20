const mongoose = require('mongoose');

const publicBotSettings = new mongoose.Schema({
    guildid: String,
    prefix: String,
    modules: Object
})

module.exports = mongoose.models['publicbotsettings'] || mongoose.model('publicbotsettings', publicBotSettings, 'publicbotsettings');
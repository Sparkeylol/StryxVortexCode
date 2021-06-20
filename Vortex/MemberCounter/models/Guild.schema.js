const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildid: String,
    prefix: String,
    groupid: String,
    logchannelid: String,
    modroleid: String,
    supportteamid: String,
    cookie: String,
    ticketcadid: String,
    suggestionid: String,
    statuses: Array,
    customcommands: Array,
    sessions: Array,
    welcometext: String,
    welcomechannel: String,
    welcometitle: String,
    welcomecolor: String,
    bottoken: String,
    verificationbindnames: Boolean,
    verificationgroupid: String,
    verificationupdaterole: String,
    branding: Boolean,
    roblox: Object,
    sessions: Object,
    container: String,
    expiresAt: Date
})

module.exports = mongoose.models['guild'] || mongoose.model('guild', guildSchema, 'guild');
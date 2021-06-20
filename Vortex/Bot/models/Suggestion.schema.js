const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    user: String,
    userusername: String,
    useravatar: String,
    guild: String,
    suggestion: String,
    id: Number,
    status: String,
    msgid: String
})

module.exports = mongoose.models['suggestion'] || mongoose.model('suggestion', suggestionSchema, 'suggestion');
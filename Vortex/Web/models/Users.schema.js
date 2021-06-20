const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.models['users'] || mongoose.model('users', usersSchema, 'users');
const mongoose = require('mongoose');
mongoose.connect("", {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false});

const users = require('../models/Users.schema')
const accounts = require('../models/Account.schema')
const sessions = require('../models/Sessions.schema')
const guild = require('../models/Guild.schema')
const codes = require('../models/Codes.schema')
const linked = require('../models/LinkedAccounts.schema')
const cases = require('../models/Cases.schema')
const membercounter = require('../models/MemberCounter.schema')

module.exports = { users, accounts, sessions, guild, codes, linked, cases, membercounter }
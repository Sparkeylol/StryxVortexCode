const Portainer = require('../../util/portainer.util')

const db = require('../../util/database.util')

const membercounters = db.membercounter
console.log("Log", db.membercounter)
const users = db.linked
const accounts = db.accounts
const sessions = db.sessions
const guilds = db.guild

const portainer = new Portainer()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.json({
        "bots": await guilds.countDocuments(),
        "users": await users.countDocuments(),
        "membercounters": await membercounters.countDocuments()
    })
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      error: true,
      body: "Only GET to /api/stats"
    }))
  }
}
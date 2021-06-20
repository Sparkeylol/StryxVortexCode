const db = require('../../../../util/database.util')
const Axios = require('axios')

const users = db.users
const accounts = db.accounts
const sessions = db.sessions
const guild = db.guild

var cache = require('../../../../util/cache.util')

async function getServers(account) {
  if (!cache.has(account.providerAccountId)) {
    const result = await Axios.get('https://discord.com/api/v8/users/@me/guilds', {
      headers: {
        "Authorization": "Bearer "+account.accessToken
      }
    })
    cache.set(account.providerAccountId, result.data)
  }

  return cache.get(account.providerAccountId)
}

export default async function handler(req, res) {
  const {
    query: { guildid }
  } = req

  if (req.method === 'GET') {
    if (!req.headers['authorization']) return res.json({
      error: true,
      body: "No Session Token."
    })
      const session = await sessions.findOne({ accessToken: req.headers['authorization'] }).exec();
      const account = await accounts.findOne({ userId: session.userId }).exec();

      const servers = await getServers(account)

      const checkGuild = servers.find(server => server.id === guildid)
      if ((checkGuild.permissions & 0x8) !== 0x8) {
        return res.json({
          error: true,
          body: "Must have MANAGE_SERVER to access this server."
        })
      }
      const guildSettings = await guild.findOne({ guildid: guildid })

      res.json({
        error: false,
        body: {
          guildSettings: guildSettings,
          server: checkGuild
        }
      })
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
      error: true,
      body: "Only GET to /api/guilds/"+guildid
    }))
  }
}
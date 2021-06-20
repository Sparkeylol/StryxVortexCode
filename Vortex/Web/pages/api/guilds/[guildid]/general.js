const db = require('../../../../util/database.util')
const Axios = require('axios')

const users = db.users
const accounts = db.accounts
const sessions = db.sessions
const guild = db.guild

const Portainer = require('../../../../util/portainer.util')
const portainer = new Portainer()

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

  if (req.method === 'POST') {
    if (!req.headers['authorization']) return res.send(JSON.stringify({
      error: true,
      body: "No Session Token."
    }))
      const session = await sessions.findOne({ accessToken: req.headers['authorization'] }).exec();
      const account = await accounts.findOne({ userId: session.userId }).exec();
      const servers = await getServers(account)
      const checkGuild = servers.find(server => server.id === guildid)
      if ((checkGuild.permissions & 0x8) !== 0x8) {
        res.setHeader('Content-Type', 'application/json')
        return res.send(JSON.stringify({
          error: true,
          body: "Must have MANAGE_SERVER to access this server."
        }))
      }
      const guildSettings = await guild.findOne({ guildid: guildid })

      if (req.body.token !== guildSettings.bottoken) {
        await guild.findOneAndUpdate({ guildid: guildid }, { prefix: req.body.prefix, statuses: req.body.statuses, bottoken: req.body.token })
        
        let container = await portainer.callApiWithKey('post', `/api/endpoints/2/docker/containers/${guildSettings.container}/restart`, {})
  
        res.json({
            error: false,
            message: "Updated Settings! Token changed, Restarting Bot..."
        })
      } else {
        let newSettings = await guild.findOneAndUpdate({ guildid: guildid }, { prefix: req.body.prefix, statuses: req.body.statuses })
        res.json({
            error: false,
            message: "Updated Settings!"
        })
      }

  } else {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
      error: true,
      body: "Only POST to /api/guilds/"+guildid+"/general"
    }))
  }
}
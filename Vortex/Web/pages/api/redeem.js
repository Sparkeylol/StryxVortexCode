const db = require('../../util/database.util')
const Axios = require('axios')

const Portainer = require('../../util/portainer.util')

const uuid = require('uuid')

const users = db.users
const accounts = db.accounts
const sessions = db.sessions
const guild = db.guild
const codes = db.codes

const portainer = new Portainer()

const cache = require('../../util/cache.util')

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
  if (req.method === 'POST') {
    if (!req.headers['authorization']) return res.send(JSON.stringify({
      error: true,
      body: "No Session Token."
    }))
      const session = await sessions.findOne({ accessToken: req.headers['authorization'] }).exec();
      const account = await accounts.findOne({ userId: session.userId }).exec();
      const servers = await getServers(account)
      const checkGuild = servers.find(server => server.id === req.body.guildid)
      if ((checkGuild.permissions & 0x8) !== 0x8) {
        res.setHeader('Content-Type', 'application/json')
        return res.send(JSON.stringify({
          error: true,
          body: "Must have MANAGE_SERVER to access this server."
        }))
      }
      const guildSettings = await guild.find({ guildid: req.body.guildid })

      if (!uuid.validate(req.body.code)) return res.send({
          error: true,
          message: "Invalid Code Syntax."
      })

      const codeObject = await codes.findOne({
          code: req.body.code
      }).exec()

      if (guildSettings === undefined || guildSettings.length === 0) {
          let expiry = new Date()

          await guild.create({
            guildid: req.body.guildid,
            prefix: "-",
            groupid: "",
            logchannelid: "",
            modroleid: "",
            supportteamid: "",
            ticketcadid: "",
            suggestionid: "",
            statuses: [],
            customcommands: [],
            sessions: [],
            welcometext: "",
            welcomechannel: "",
            welcometitle: "",
            welcomecolor: "",
            bottoken: "",
            sessions: {
              shifts: {
                  channel: '',
                  create: '',
                  role: '',
                  text: '',
                  title: '',
                  color: '',
              },
              training: {
                  channel: '',
                  create: '',
                  role: '',
                  text: '',
                  title: '',
                  color: '',
              },
              interviews: {
                  channel: '',
                  create: '',
                  role: '',
                  text: '',
                  title: '',
                  color: '',
              }
            },
            branding: true,
            roblox: {
              verification: {
                groupid: "",
                updaterole: "",
                bindnames: false
              },
              cookie: "",
              rankrole: ""
            },
            container: "",
            expiresAt: new Date(expiry.setMonth(expiry.getMonth()+codeObject.months))
          })

          let image = await portainer.callApiWithKey('post', '/api/endpoints/2/docker/images/create?fromImage=jackmerrill%2Fvhq-bot-base:latest', {
            "fromImage":"jackmerrill/vhq-bot-base:latest"
          })

          let container = await portainer.callApiWithKey('post', '/api/endpoints/2/docker/containers/create?name='+req.body.guildid, {
            "Image": "jackmerrill/vhq-bot-base:latest",
            "Env": [
              `GUILD_ID=${req.body.guildid}`
            ],
            "HostConfig": {
              "RestartPolicy": {
                "MaximumRetryCount": 0,
                "Name": "always"
              }
            },
            "name": `${req.body.guildid}`
          })

          let startContainer = await portainer.callApiWithKey('post', `/api/endpoints/2/docker/containers/${container.Id}/start`)

          await guild.findOneAndUpdate({ guildid: req.body.guildid }, { container: container.Id })

          await codes.findOneAndDelete({ code: req.body.code })
          return res.send({
              error: false,
              message: "Applied code!"
          })
      }

      if (codeObject === null) return res.send({
          error: true,
          message: "Code does not exist."
      })

      var newDate = new Date().setMonth(new Date().getMonth() + codeObject.months)

      guild.findOne({ guildid: req.body.guildid }).then(async g => {
        if (Date.parse(g.expiresAt) < Date.now()) {
          let startContainer = await portainer.callApiWithKey('post', `/api/endpoints/2/docker/containers/${g.Id}/start`)
          console.log(startContainer)
        }
      })

      await guild.findOneAndUpdate({ guildid: req.body.guildid }, { 
          expiresAt: newDate
      })

      await codes.findOneAndDelete({ code: req.body.code })

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({
        error: false,
        message: "Applied code!"
      }))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
      error: true,
      body: "Only POST to /api/redeem"
    }))
  }
}
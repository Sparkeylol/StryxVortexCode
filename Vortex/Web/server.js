const express = require('express')
const next = require('next')

const bodyParser = require('body-parser')

const PortainerClient = require('portainer-api-client');

const portainer = new PortainerClient("https://docker.vortexhq.net", "admin", "e@S34*w3%UMBVNNU");

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const guilds = require('./util/database.util').guild

// todo: hourly checking of all guilds, if one expired add one day grace period by adding one day to expiration date.

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

app.prepare().then(() => {
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)

    setInterval(async function() {
      let allGuilds = await guilds.find()

      allGuilds.forEach(async guild => {
        if (Date.parse(guild.expiresAt) <= Date.now()) {
          let stoppedContainer = await portainer.callApiWithKey('post', `/api/endpoints/2/docker/conatiners/${guild.container}/stop`)
          console.log(stoppedContainer)
        }
      })
    }, 3600000) // 1 hour
  })
})

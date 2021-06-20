const Uptime = {
  name: "Uptime",
  command: "uptime",
  category: "Utility",
  description: "Check the bots uptime.",
  usage: "uptime",
  execute: async function(client, msg, args, embed, guildSettings) {

  const time = require('ms')
  const uptime = time(client.uptime)
  msg.channel.send({embed: {
    color: "RANDOM",
    title: "Up Time",
    description: `The bot has been up for about ${uptime}.`,
    footer: {
      text: client.user.username,
      icon_url: client.user.displayAvatarURL()
    },
    timestamp: new Date()
  }})
} 
}
module.exports = Uptime
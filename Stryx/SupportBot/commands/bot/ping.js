const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'],
           description: {
             content: 'Check the bot\'s ping!',
             ownerOnly: false,
             usage: ''
           },
           category: 'bot',
           cooldown: 5000,
           ratelimit: 2
        });
    }

    async exec(msg) {
      const guildSettings = this.handler.guildSettings

      let embed = new MessageEmbed();
      embed.setTitle("**Fetching Ping...**")
      embed.setColor('YELLOW')
      embed.setAuthor(msg.author.username, msg.author.avatarURL())
      msg.channel.send(embed).then(m => {
          embed.setTitle("**Pong!**")
          embed.addField("API Latency:", `${m.createdTimestamp - msg.createdTimestamp} ms`)
          embed.addField("Bot Latency", `${Math.round(this.client.ws.ping)} ms`)
          embed.setColor('GREEN')
          embed.setTimestamp()
          m.edit(embed)
      })
    }
}

module.exports = PingCommand;

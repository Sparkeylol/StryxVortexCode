const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const ms = require('ms')

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(msg, command, remaining) {
      let embed = new MessageEmbed()

      embed.setTitle('Uh oh!')
      embed.setDescription(`This command is on cooldown! You can run this command again in ${ms(remaining, { long: true })}.`)
      embed.setAuthor(msg.author.username, msg.author.avatarURL())
      embed.setColor('RED')
      embed.setTimestamp()
      embed.setFooter('Powered by Stryx.cloud', this.client.user.avatarURL())

      msg.channel.send(embed)
    }
}

module.exports = CooldownListener;

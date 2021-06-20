const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const ms = require('ms')

class BlockedListener extends Listener {
    constructor() {
        super('blocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    exec(msg, command, reason) {
      let embed = new MessageEmbed()

      embed.setTitle('Uh oh!')
      embed.setDescription(`This command has been blocked for: ${(reason === 'dm' ? '**This command can only be used in DMs!**' : reason)}`)
      embed.setAuthor(msg.author.username, msg.author.avatarURL())
      embed.setColor('RED')
      embed.setTimestamp()
      embed.setFooter('Powered by Stryx.cloud', this.client.user.avatarURL())

      msg.channel.send(embed)
    }
}

module.exports = BlockedListener;

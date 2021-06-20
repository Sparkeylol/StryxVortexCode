const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MessageDeletedHandler extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    exec(message) {
      // var logchannel = this.client.channels.cache.get(`776229864617148456`)
      // const loggingEmbed = new MessageEmbed()
      // console.log('this one')
      // loggingEmbed.setTitle("Message Deleted")
      // loggingEmbed.setColor("RED")
      // loggingEmbed.addField("Message:", `${message} `, true )
      // loggingEmbed.addField("Message Author:", `<@${message.author.id}> (${message.author.id})`, true)
      // loggingEmbed.addField("Channel Deleted In:", `${message.channel} `, true)
      // loggingEmbed.setTimestamp()
      // loggingEmbed.setFooter("Powered by Stryx.cloud");

      // logchannel.send(loggingEmbed);
    }
}

module.exports = MessageDeletedHandler;

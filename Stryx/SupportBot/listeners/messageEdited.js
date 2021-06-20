const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MessageEditedHandler extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(oldMessage, newMessage) {
      // var logchannel = this.client.channels.cache.get(`776229864617148456`)
      // const editedEmbed = new MessageEmbed()
      // console.log('that one', oldMessage.content, newMessage.content)
      // editedEmbed.setTitle("Message Edited")
      // editedEmbed.setColor("RED")
      // editedEmbed.addField("Old Message:", `${oldMessage} `, true)
      // editedEmbed.addField("New Message:", `${newMessage} `, true)
      // editedEmbed.addField("Message Author:", `<@${oldMessage.author.id}> (${oldMessage.author.id})`, true)
      // editedEmbed.addField("Channel Edited In: ", `${oldMessage.channel} `, true)
      // editedEmbed.setTimestamp()
      // editedEmbed.setFooter("Powered by Stryx.cloud");
      // logchannel.send(editedEmbed);
    }
}

module.exports = MessageEditedHandler;

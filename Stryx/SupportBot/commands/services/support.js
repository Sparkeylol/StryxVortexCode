const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

const noblox = require('noblox.js')

class SupportCommand extends Command {
    constructor() {
        super('support', {
           aliases: ['support'],
           description: {
             content: 'Use this command when a user asks for support.',
             ownerOnly: false,
             usage: 'support'
           },
           category: 'support',
           cooldown: 1000,
        });
    }

    async exec(msg) {
      let embed = new MessageEmbed()
      embed.setTitle("Support | <:intercom:811243426183118869>")
      embed.setDescription("Hey there! Please abide by [Rule 14](https://discord.com/channels/775660541627596810/775664259895525406/824319788053561374). This isn't a support server, so please utilize the live chat on our [website](https://stryx.cloud) for support, thank you! :grin:")
      embed.setColor("731DD8")
      embed.setImage("https://cdn.discordapp.com/attachments/788496967810416703/824401749334818846/unknown.png")
      return msg.channel.send(embed)
    }
}

module.exports = SupportCommand;

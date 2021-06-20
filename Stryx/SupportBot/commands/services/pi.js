const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

const noblox = require('noblox.js')

class PICommand extends Command {
    constructor() {
        super('pi', {
           aliases: ['pi', 'partnerinfo'],
           description: {
             content: 'Post Partnership Information',
             usage: ''
           },
           ownerOnly: true,
           category: 'services',
           cooldown: 5000,
        });
    }

    async exec(msg) {
      let partners = await db.partners.findMany()
      var channel = this.client.channels.cache.get(`820369554098225172`)
      channel.bulkDelete(100)
      embed.setTitle("Partnership Informaton | 🤝")
      embed.setDescription("Hi there! To partner with Stryx, please review [this](https://help.stryx.cloud/en/articles/4931472-partnership-information) help article! Below you can find our current partners!")
      embed.setColor("731DD8")
      partners.forEach(async (partner) => {
        let embed = new MessageEmbed()

        let logo = await noblox.getLogo(partner.robloxId)
        let info = await noblox.getGroup(partner.robloxId)

        embed.setTitle(info.name)
        embed.addField('Representatives', partner.reps.map((rep) => `<@${rep}>, `))
        embed.addField('Roblox Link', `https://roblox.com/groups/${partner.robloxId}`)
        embed.addField('Discord Link', partner.discord)
        embed.setColor('BLUE')
        embed.setThumbnail(logo)
        channel.send(embed)

        msg.channel.send('Updated.')
      })
    }
}

module.exports = PICommand;

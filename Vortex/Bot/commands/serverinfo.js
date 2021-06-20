const Serverinfo = {
    name: "Serverinfo",
    command: "serverinfo",
    category: "Utility",
    description: "Get stats regarding the server.",
    usage: "serverinfo",
    execute: async function(client, msg, args, embed, guildSettings) {

const { MessageEmbed } = require('discord.js');

const server = msg.guild


 let info = new MessageEmbed()
.setTitle(`${server.name} Server Information`)
.addField('Server ID',`${server.id}`, true)
.addField('Members',`${server.memberCount}`, true)
.addField('Roles',`${server.roles.cache.size}`, true)
.addField('Server Owner',`<@${server.owner.id}>`, true)
.addField("Emoji Count", `This server has ${msg.guild.emojis.cache.size} emojis`, true)
.addField(`Server Creation Date`, `${new Date(server.createdTimestamp)}`, true)
.setColor("GREEN")
.setFooter(`Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`)

msg.channel.send(info)
  

}
}

module.exports = Serverinfo
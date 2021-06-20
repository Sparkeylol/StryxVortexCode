const DM = {
    name: "DM",
    command: "dm",
    category: "Utility",
    description: "DM a user from the bot.",
    usage: "dm <@user> <message>",
    execute: async function(client, msg, args, embed, guildSettings) {


        if (!guildSettings.modroleid || !guildSettings.logchannelid){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to set the Moderator Role ID and/or the Log Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {
        if (!msg.member.roles.cache.has(`${guildSettings.modroleid}`)) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription(`You must have the <@&${guildSettings.modroleid}> role to use this command!`)
            return msg.channel.send(embed)
        }

        if (!args[0]) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription("Please mention the user you wish to DM!")
            return msg.channel.send(embed)
        }
        if (!args[1]) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription("Please provide a message for the DM!")
            return msg.channel.send(embed)
        }
        let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0])
        let moderator = msg.author
        let message = args.slice(1).join(" ")
        var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
            const Discord = require('discord.js');
        const dmembed = new Discord.MessageEmbed()
        .setTitle(`You've Received A Message From ${msg.author.tag}!`)
        .setDescription(message)
        .setColor("RANDOM")
        .setFooter((guildSettings.branding ? "Powered by Stryx.cloud" : client.user.username), client.user.avatarURL())
        user.send(dmembed)

        .catch(() => {
           embed.setTitle("Uh oh!")
           embed.setDescription(`I'm unable to send a DM to ${user} because they have their DMs off.`)
           embed.setColor("RED")
           return msg.channel.send(embed)
        }) 
        console.log("No error yet.")

        embed.setTitle("Got it!")
        embed.setDescription(`I've DMed ${user} with the following message:\n`
        + `\`\`\`${message}\`\`\``)
        msg.channel.send(embed)

        embed.setTitle("DM Action")
        embed.setDescription(`${moderator} has DMed ${user} with the following message:\n`
        + `\`\`\`${message}\`\`\``)
        logchannel.send(embed)
        
    }
    }}
    module.exports = DM
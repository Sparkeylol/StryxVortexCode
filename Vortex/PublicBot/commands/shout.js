
const Shout = {
    name: "Shout",
    command: "shout",
    category: "Roblox",
    description: "Post a group shout.",
    usage: "shout <shout>",
    execute: async function(client, msg, args, embed, guildSettings) {


        if (!guildSettings.roblox.verification.updaterole || !guildSettings.roblox.cookie){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure this command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        } else {
            if (!msg.member.roles.cache.has(`${guildSettings.roblox.verification.updaterole}`)) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription(`You must have the <@&${guildSettings.roblox.verification.updaterole}> role to use this command!`)
                return msg.channel.send(embed)
            }

            roblox = require("noblox.js")

            try {
                await roblox.setCookie(guildSettings.roblox.cookie)
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
                embed.setColor("RED")
                return msg.channel.send(embed)    
            }
         const groupid = guildSettings.roblox.groupid
            const messagetoshout = args.slice(0).join(" ")

            if(!args[0]){
                embed.setTitle("Uh oh!")
                embed.setDescription("Please provide a shout!")
                embed.setColor("RED")
                return msg.channel.send(embed)
            }
            
            roblox.shout(groupid, messagetoshout)
            
            embed.setTitle("Got it!")
            embed.setDescription(`The [group](https://www.roblox.com/groups/${groupid}) shout has been posted as:\n`
            + `\`\`\`${messagetoshout}\`\`\``)
            embed.setColor("GREEN")
            msg.channel.send(embed)

            var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
            embed.setTitle("New Group Shout")
            embed.setDescription(`<@${msg.author.id}> has posted a new [group](https://www.roblox.com/groups/${groupid}) shout!\n`
            + `\`\`\`${messagetoshout}\`\`\``)
            embed.setColor("GREEN")
            logchannel.send(embed)
  

        }
    }
}
    module.exports = Shout
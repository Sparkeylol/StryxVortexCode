const Fire = {
    name: "Fire",
    command: "fire",
    category: "Roblox",
    description: "Fire a user in the Roblox group (make them the lowest rank).",
    usage: "fire <roblox username>",
    execute: async function(client, msg, args, embed, guildSettings) {
        const roblox = require("noblox.js")


        if (!guildSettings.roblox.cookie){
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
        
            try {
                await roblox.setCookie(guildSettings.roblox.cookie)
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
                embed.setColor("RED")
                return msg.channel.send(embed)    
            }
        
            const groupid = guildSettings.roblox.groupid

            let username = args[0];
            if(!username){
                embed.setTitle("Uh oh!")
                embed.setDescription(`Please specify the user for who you want to fire!`)
                embed.setColor("RED")
                return msg.channel.send(embed)
            }
            try {
                id = await roblox.getIdFromUsername(username);
            } catch {
                    embed.setTitle("Uh oh!")
                    embed.setDescription(`It seems like **${username}** isn't a valid Roblox username!`)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
            }
                try {
                    await roblox.setRank(Number(groupid), id, 1);
                } catch (err) {
                    embed.setTitle("Uh oh!")
                    embed.setDescription("An error occured. If you need any help, please join our [Support Server](https://discord.gg/cbRSPFc6TV)!")
                    embed.addField("Error", err)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
                    const rankName = await roblox.getRankNameInGroup(groupid, id)

                    embed.setTitle("Got it!")
                    embed.setDescription(`**${username}** has been fired!`)
                    msg.channel.send(embed)

                    var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
                    embed.setTitle("User Fired")
                    embed.setDescription(`<@${msg.author.id}> fired **${username}**!`)
                    logchannel.send(embed)
        }
    }}
    module.exports = Fire
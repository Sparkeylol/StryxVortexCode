const Setrank = {
        name: "Setrank",
        command: "setrank",
        category: "Roblox",
        description: "Set a user's rank in the Roblox group.",
        usage: "setrank <roblox username> <role id>",
        execute: async function (client, msg, args, embed, guildSettings) {
            if (!guildSettings.roblox.cookie || !guildSettings.roblox.groupid) {
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
                const roblox = require("noblox.js")
                const groupid = guildSettings.roblox.groupid
                let id;
    
                let username = args[0];
                if (!username) {
                    embed.setTitle("Uh oh!")
                    embed.setDescription(`Please specify the user for who you want to set-rank!`)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
                try {
                    id = await roblox.getIdFromUsername(username);
                } catch {
                    embed.setTitle("Uh oh!")
                    embed.setDescription(`Hm.. ${username} isn't a valid Roblox username.`)
                    embed.setColor("RED")
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
                if (!args[1]) {
                    embed.setTitle("Uh oh!")
                    embed.setDescription(`Please specify the group rank!`)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
    
                const roles = await roblox.getRoles(groupid)
                const rName = args.slice(1).join(" ")
                const filtered = roles.filter((role) => role.name.includes(rName))
    
    
                if (filtered.length > 1) {
                    embed.setTitle("Uh oh!")
                    embed.setDescription(`I found multiple roles that match the specified name. Please include more of the role's name.`)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
                try {
                    var promoteResponse = await roblox.getRole(groupid, filtered[0].rank);
                } catch (err) {
                    console.log(err)
                    embed.setTitle("Uh oh!")
                    embed.setDescription("An error occured. If you need any help, please join our [Support Server](https://server.stryx.cloud)")
                    embed.addField("Error", err)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
    
                try {
                     await roblox.setRank(groupid, id, filtered[0].rank)
                } catch (err) {
                    console.log(err)
                    embed.setTitle("Uh oh!")
                    embed.setDescription("An error occured. If you need any help, please join our [Support Server](https://server.stryx.cloud)")
                    embed.addField("Error", err)
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
                embed.setTitle("Got it!")
                embed.setDescription(`I've ranked ${username} to **${promoteResponse.name}**!`)
                msg.channel.send(embed)
    
                var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
                if (!logchannel) {
                    console.log("they legit dont have a log channel buh what")
                } else {
                    embed.setTitle("User Rank Changed")
                    embed.setDescription(`<@${msg.author.id}> ranked ${username} to **${promoteResponse.name}**!`)
                    logchannel.send(embed)
                }
    
            }
        }
    }
    module.exports = Setrank
const Group = {
    name: "Group",
    command: "group",
    category: "Roblox",
    description: "Get info regarding the Roblox group.",
    usage: "group",
    execute: async function(client, msg, args, embed, guildSettings) {
        const roblox = require("noblox.js")


        if (!guildSettings.roblox.cookie){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure this command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        } else {
            
        
            try {
                await roblox.setCookie(guildSettings.roblox.cookie)
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
                embed.setColor("RED")
                return msg.channel.send(embed)    
            }
        
            const groupid = guildSettings.roblox.groupid


            const groupinfo = await roblox.getGroup(groupid)
            const logo = await roblox.getLogo(groupid)

                embed.setTitle(`Information for ${groupinfo.name}`)
                embed.setDescription(groupinfo.description)
                embed.addField("Current Shout", groupinfo.shout.body, true)
                embed.addField("Current Member Count", groupinfo.memberCount, true)
                embed.addField("Public Entry Allowed?", groupinfo.publicEntryAllowed, true)
                embed.addField("Group Owner", groupinfo.owner.username, true)
                embed.addField("Group Link", `[Click here](https://www.roblox.com/groups/${groupinfo.id})`, true)
                embed.setColor("RANDOM")
                embed.setThumbnail(logo)
                msg.channel.send(embed)





        }


}}
module.exports = Group
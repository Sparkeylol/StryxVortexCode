const Wall = {
    name: "Wall",
    command: "wall",
    category: "Roblox",
    description: "Get the most recent messages of the group wall.",
    usage: "wall",
    execute: async function(client, msg, args, embed, guildSettings) {

        if (!guildSettings.roblox.cookie || !guildSettings.roblox.groupid){
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
 

        try {
            await roblox.setCookie(guildSettings.roblox.cookie)
        } catch {
            embed.setTitle("Uh oh!")
            embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)    
        }

        const rankLogs = await roblox.getWall(groupid)
        rankLogs.data.forEach(log => {
            console.log(log)
            embed.addField(log.body, `Sent By: [${log.poster.user.username}](https://www.roblox.com/users/${log.poster.user.userId}/profile).\nTime: ${log.created}.\nUser's Role: ${log.poster.role.name} **(${log.poster.role.rank})**.`)
        })
            embed.setTitle("Group Wall Posts")
            embed.setDescription("These are the most recent group wall posts!")
            msg.channel.send(embed)

    }}
}
    module.exports = Wall
const Funds = {
    name: "Funds",
    command: "funds",
    category: "Utility",
    description: "Get group funds.",
    usage: "funds",
    execute: async function(client, msg, args, embed, guildSettings) {
        const roblox = require("noblox.js")

        await roblox.setCookie(guildSettings.roblox.cookie)

        if (!guildSettings.roblox.verification.updaterole
             || !guildSettings.roblox.cookie){
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
            const Bloxy = require("bloxy")


            const rbxBot = new Bloxy.Client()
  
            try {
                await rbxBot.login(guildSettings.roblox.cookie)
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
                embed.setColor("RED")
                return msg.channel.send(embed)
            }
            try { 
            const groupid = guildSettings.roblox.groupid

            const group = await rbxBot.getGroup(groupid)

            const funds = await group.getFunds()
            const requests = await roblox.getJoinRequests(groupid, "Asc", "10")
                embed.setTitle("Group Fund Count")
                embed.setDescription(`${group.name} has ${funds} Robux!`)
                embed.setColor("GREEN")
                msg.channel.send(embed)
console.log(requests)
            } catch (err) {
                console.log(err)
                embed.setTitle("Uh oh!")
                embed.setDescription("I'm unable to get the funds for this group! It's either because I don't have permission to view the funds of the group funds are not public!")
                embed.setColor("RED")
                     msg.channel.send(embed)
            }
        }
    }
}

    module.exports = Funds
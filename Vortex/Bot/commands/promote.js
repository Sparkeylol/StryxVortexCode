const Promote = {
    name: "Promote",
    command: "promote",
    category: "Roblox",
    description: "Promote a user in the Roblox group.",
    usage: "promote <roblox username>",
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
        let id;

        let username = args[0];
        if(!username){
            embed.setTitle("Uh oh!")
            embed.setDescription(`Please specify the user you wish to promote!`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        }

        try {
            id = await roblox.getIdFromUsername(username);
        } catch {
            embed.setTitle("Uh oh!")
            embed.setDescription(`Hm.. ${uername} isn't a valid Roblox username.`)
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

        try {
            var promoteResponse = await roblox.promote(groupid, id);
        } catch (err) {
            embed.setTitle("Uh oh!")
            embed.setDescription(`An error occured. If you need any help, please join our [Support Server](https://discord.gg/cbRSPFc6TV)!`)
            embed.addField("Error", err)
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
            embed.setTitle("Got it!")
            embed.setDescription(`I've promoted ${username} to **${promoteResponse.newRole.name}**`)
            msg.channel.send(embed)

            var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
            embed.setTitle("User Promoted")
            embed.setDescription(`<@${msg.author.id}> promoted ${username} to **${promoteResponse.newRole.name}**!`)
            logchannel.send(embed)

    }}
}
    module.exports = Promote
const Setrank = {
    name: "Setrank",
    command: "setrank",
    category: "Roblox",
    description: "Set a user's rank in the Roblox group.",
    usage: "setrank <roblox username> <role id>",
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
            embed.setDescription(`Please specify the user for who you want to set-rank!`)
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
            var promoteResponse = await roblox.setRank(groupid, id, parseInt(args[1]));
        } catch (err) {
                        console.log(err)
            embed.setTitle("Uh oh!")
            embed.setDescription("An error occured. If you need any help, please join our [Support Server](https://discord.gg/cbRSPFc6TV)! **Just a friendly reminder, you must use Roblox Rank ID's with this command. You can find that by using the `" + guildSettings.prefix + "ranklist` command.**")
            embed.addField("Error", err)
            embed.setColor("RED")
            return msg.channel.send(embed)        }
        console.log(`Args 0 = ${args[0]} `)
        console.log(`Args 1 = ${args[1]} `)

            embed.setTitle("Got it!")
            embed.setDescription(`I've ranked ${username} to **${promoteResponse.name}**`)
            embed.setColor("GREEN")
            msg.channel.send(embed)

            var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
            embed.setTitle("User Rank Changed")
            embed.setDescription(`<@${msg.author.id}> ranked ${username} to **${promoteResponse.name}**!`)
            embed.setColor("GREEN")
            logchannel.send(embed)

    }}
}
    module.exports = Setrank
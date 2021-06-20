const Removecase = {
    name: "Removecase",
    command: "removecase",
    category: "Moderation",
    description: "Remove a moderation case.",
    usage: "removecase <case id>",
    execute: async function (client, msg, args, embed, guildSettings) {
        const cases = require('../util/database.util').cases
        var logchannel = client.channels.cache.get(guildSettings.logchannelid)

        if (!guildSettings.modroleid || !guildSettings.logchannelid) {
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
                embed.setDescription("Please provide a Case ID to view!")
                return msg.channel.send(embed)
            }


            try {
                await cases.findOne({ caseid: args[0] })
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`I'm unable to find a case with the provided ID.`)
                embed.setColor("RED")
                 return msg.channel.send(embed)
            }
            let userCase = await cases.findOne({ caseid: args[0] })
            embed.setColor(msg.guild.me.displayColor)
            embed.setTitle("Got it!")
            embed.setDescription("I've removed that case! Below is all the information for that case.")
            embed.addField("Moderator", `<@${userCase.resmod}> (${userCase.resmod})`)
            embed.addField("Offender", `<@${userCase.offender}> (${userCase.offender})`)
            embed.addField("Reason", userCase.reason)
            embed.addField("Date", `${userCase.date}`)
            embed.addField("Moderation Type", `${userCase.type}`)
            msg.channel.send(embed)
            await cases.findOneAndDelete({ caseid: args[0] })
            embed.setTitle("Case Removed")
            embed.setDescription(`<@${msg.author.id}> has removed case: ` + "``" + args[0] + "``")
            logchannel.send(embed)
        }
    }
}
module.exports = Removecase   
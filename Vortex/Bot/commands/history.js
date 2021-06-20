const History = {
    name: "history",
    command: "history",
    category: "Moderation",
    description: "View a user's moderation history.",
    usage: "history <user>",
    execute: async function (client, msg, args, embed, guildSettings) {
        const cases = require('../util/database.util').cases

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
                embed.setDescription("Please provde the user to lookup!")
                return msg.channel.send(embed)
            }


            let user = msg.mentions.users.first()


            embed.setTitle("User History")
            embed.setDescription(`This is the history lookup for ${user}`)
            embed.setColor("GREEN")
            let userCases = await cases.find({ offender: user.id }) // assuming user is tag-only and not id too
            userCases.forEach(userCase => {
                embed.addField(`Case ${userCase.caseid} - ${userCase.type}`, userCase.reason)
            })


            msg.channel.send(embed)



        }
    }
}
module.exports = History
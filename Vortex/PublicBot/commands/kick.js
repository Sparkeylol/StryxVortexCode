const cases = require('../util/database.util').cases

const Kick = {
    name: "Kick",
    command: "kick",
    category: "Moderation",
    description: "Kick a user",
    usage: "kick <@user> [reason]",
    execute: async function(client, msg, args, embed, guildSettings) {
       
        if (!guildSettings.modroleid || !guildSettings.logchannelid){
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
            embed.setDescription("Please provide a member you want me to kick!")
            return msg.channel.send(embed)
        }
        let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0])
        let moderator = msg.author
        let reason = args.slice(1).join(" ")
        var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
        let modroleid = guildSettings.modroleid

        if (!args[0]) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription("Please provide a member you want me to kick!")
            return msg.channel.send(embed)
        }
       
        if (!reason) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription("Please provide a reason for the kick!")
            return msg.channel.send(embed)
        }
    
        function generateCaseId() {
            return Math.floor(Math.random() * (9999999999 - 100000000 + 1) + 100000000);
        }
        let caseid = generateCaseId()

        cases.create({
            caseid: caseid,
            reason: reason,
            user: user.id,
            date: Date.now(),
            resmod: moderator,
            type: "Kick"
        })
        let target = msg.guild.members.cache.get(user.id)

        console.log(caseid)

        embed.setTitle(`Kicked From ${msg.guild}`)
        embed.setDescription(`Greetings, ${target}, you have been kicked from ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}\n**Case ID:**\n${caseid}.`)
        embed.setColor(`RED`)

        target.send(embed)

        target.kick(`Kicked issued by: ${moderator.username}. Reason: ${reason}. Case ID: ${caseid}`)
            .then((user) => {
                msg.channel.send({
                    embed: {

                        footer: {
                            text: `Moderation | Powered by ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
                        },
                        color: "GREEN",
                        title: "User Kicked!",
                        description: `Successfully kicked <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>\n\nCase ID: ${caseid}`,
                        timestamp: new Date(),

                    }
                })
                embed.setTitle("User Kicked")
                embed.setDescription(`**Member:** ${user}\n**Action Taken:** Kick\n**Reason:** ${reason}\nCase ID: ${caseid}`)
                embed.setColor(`RED`)
                logchannel.send(embed)
            })
            .catch((err) => {
                console.log(err)
                msg.channel.send(`There was an error kicking <@${user.id}>`)
            })    
            }
}
}
module.exports = Kick
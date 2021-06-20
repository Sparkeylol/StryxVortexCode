const Kick = {
    name: "Kick",
    command: "kick",
    category: "Moderation",
    description: "Kick a user",
    usage: "kick <@user> [reason]",
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
                embed.setDescription("Please provide a member you want me to kick!")
                return msg.channel.send(embed)
            }

            let user = msg.guild.members.cache.get(args[0]) || msg.mentions.users.first()
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


            let target = msg.guild.members.cache.get(user.id)|| msg.mentions.users.first()


           
            target.kick(`Kicked issued by: ${moderator.username}. Reason: ${reason}.`)
                .then((user) => {

                    let caseid = generateCaseId()
                    function generateCaseId() {
                        return Math.floor(Math.random() * (9999999999 - 100000000 + 1) + 100000000);
                    }
                    cases.create({
                        caseid: caseid,
                        date: Date.now(),
                        resmod: moderator.id,
                        offender: user.id,
                        reason: reason,
                        type: "Kick"
                    })

                    msg.channel.send({
                        embed: {
                            footer: {
                                text: `Moderation | Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
                            },
                            color: msg.guild.me.displayColor,
                            title: "User Kicked!",
                            description: `Successfully kicked <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>.\n**Case ID:** ${caseid}`,
                            timestamp: new Date(),

                        }
                    })
                    
                    embed.setTitle("User Kicked")
                    embed.setDescription(`**Member:** ${user}\n**Action Taken:** Kick\n**Reason:** ${reason}\n**Case ID:** ${caseid}`)
                    logchannel.send(embed)

                    try {
                        embed.setTitle(`Kicked From ${msg.guild}`)
                        embed.setDescription(`Greetings, ${target}, you have been kicked from ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}\n**Case ID:** ${caseid}`)
        
                        target.send(embed)
                    } catch {
                        embed.setTitle("Uh oh!")
                        embed.setDescription(`I was able to kick ${target}, however, I was unable to send them a DM due to their privacy settings!`)
                        msg.channel.send(embed)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    msg.channel.send(`There was an error kicking <@${user.id}>`)
                    console.log(err)
                })
        }
    }
}
module.exports = Kick
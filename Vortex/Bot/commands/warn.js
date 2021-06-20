const Warn = {
    name: "Warn",
    command: "warn",
    category: "Moderation",
    description: "Warn a user",
    usage: "Warn <@user> [reason]",
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
                embed.setDescription("Please provide a member you want me to warn!")
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
                embed.setDescription("Please provide a member you want me to warn!")
                return msg.channel.send(embed)
            }

            if (!reason) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a reason for the warn!")
                return msg.channel.send(embed)
            }


            let target = msg.guild.members.cache.get(user.id)|| msg.mentions.users.first()


           
               

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
                        type: "Warn"
                    })

                    msg.channel.send({
                        embed: {
                            footer: {
                                text: `Moderation | Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
                            },
                            color: msg.guild.me.displayColor,
                            title: "User Warned!",
                            description: `Successfully warned <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>.\n**Case ID:** ${caseid}`,
                            timestamp: new Date(),

                        }
                    })
                    
                    embed.setTitle("User Warned")
                    embed.setDescription(`**Member:** ${user}\n**Action Taken:** Warn\n**Reason:** ${reason}\n**Case ID:** ${caseid}`)
                    logchannel.send(embed)

                    try {
                        embed.setTitle(`Warned In ${msg.guild}`)
                        embed.setDescription(`Greetings, ${target}, you have been warned in ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}\n**Case ID:** ${caseid}`)
        
                        target.send(embed)
                    } catch {
                        embed.setTitle("Uh oh!")
                        embed.setDescription(`I was able to warn ${target}, however, I was unable to send them a DM due to their privacy settings!`)
                        embed.setColor("RED")
                        msg.channel.send(embed)
                    }
               
                
        }
    }
}
module.exports = Warn
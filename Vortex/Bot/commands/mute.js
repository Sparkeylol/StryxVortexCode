const ms = require('ms')


const Mute = {
    name: "Mute",
    command: "mute",
    category: "Moderation",
    description: "Mute a user",
    usage: "mute <@user> <time> <reason>",
    execute: async function (client, msg, args, embed, guildSettings) {
        const target = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first()
        let reason = args.slice(2).join(" ")
        var logchannel = client.channels.cache.get(guildSettings.logchannelid)
        let modroleid = guildSettings.modroleid
        let moderator = msg.author
        const mutedrole = guildSettings.mutedroleid
        const cases = require('../util/database.util').cases
        const db = require('../util/database.util').guild


           

        if (!guildSettings.modroleid || !guildSettings.logchannelid) {
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to set the Moderator Role ID and/or the Log Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {

            if (!msg.member.roles.cache.has(`${guildSettings.modroleid}`)) {
                embed.setTitle("Uh oh!")
                embed.setColor("RED")
                embed.setDescription(`You must have the <@&${guildSettings.modroleid}> role to use this command!`)
                return msg.channel.send(embed)
            }

            if (!args[0]) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a member you want me to mute!")
                return msg.channel.send(embed)
            }


            if (!target) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a valid member you want me to mute!")
                return msg.channel.send(embed)
            }




            const time = args[1]
            if (!time) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please specify a duration of time the user will be muted for!")
                return msg.channel.send(embed)
            }


            if (!reason) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a reason for the mute!")
                return msg.channel.send(embed)
            }

            
                target.roles.add(mutedrole) .catch(() => {
                    msg.guild.roles.create({
                        data: {
                          name: 'Muted',
                        },
                      })
                        .then(async role => {
                            await db.findOneAndUpdate({ guildid: msg.guild.id }, { mutedroleid: role.id })
                            embed.setTitle("Uh oh!")
                        embed.setDescription(`There was no muted role set! I've gone ahead and made <@&${role.id}>! Don't worry, they're still muted! :blush:`)
                        embed.setColor("RED")
                         msg.channel.send(embed)
                         target.roles.add(role.id)
                        })
                 }) 

            
            
            let caseid = generateCaseId()
            function generateCaseId() {
                return Math.floor(Math.random() * (9999999999 - 100000000 + 1) + 100000000);
            }
            cases.create({
                caseid: caseid,
                date: Date.now(),
                resmod: moderator.id,
                offender: target.id,
                reason: reason,
                type: "Mute"
            })

            msg.channel.send({
                
                embed: {
                    footer: {
                        text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
                    },
                    color: msg.guild.me.displayColor,
                    title: "User Muted!",
                    description: `Successfully muted ${target}.\n**Reason:** ${reason}\n**Duration:** ${ms(ms(time))}\n**Moderator:** <@${moderator.id}>\n**Case ID:** ${caseid}`,
                    timestamp: new Date(),

                }
            })
            try {
                embed.setTitle(`Muted In ${msg.guild}`)
                embed.setDescription(`Greetings, ${target}, you have been muted in ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}.\nCase ID: ${caseid}`)
                target.send(embed)
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`I was able to mute ${target}, however, I was unable to send them a DM due to their privacy settings!`)
                embed.setColor("RED")
                msg.channel.send(embed)
            }

            embed.setTitle("User Muted")
            embed.setDescription(`**Member:** ${target}\n**Action Taken:** Mute\n**Reason:** ${reason}\n**Duration:** ${ms(ms(time))}\n**Case ID: ${caseid}**`), //**Case ID:** ${caseid}`)
            logchannel.send(embed)

            setTimeout(function () {
                target.roles.remove(mutedrole);
                embed.setTitle(`Unmuted In ${msg.guild}`)
                embed.setDescription(`Greetings, ${target}, you have been unmuted in ${msg.guild}.\n\n**Reason:** Mute duration expired.`)

                target.send(embed)
                
                 embed.setTitle("User Unmuted")
                embed.setDescription(`**Member:** ${target}\n**Action Taken:** Auto Unmuted\n**Reason:** Mute Time Expired (${ms(ms(time))})\n**Duration:** ${ms(ms(time))}`)
                logchannel.send(embed)

               

            }, ms(time));
        }
    }
}
module.exports = Mute
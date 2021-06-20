const Ban = {
    name: "Ban",
    command: "ban",
    category: "Moderation",
    description: "Ban a user",
    usage: "ban <@user> [reason]",
    execute: async function (client, msg, args, embed, guildSettings) {
        console.log("ref", msg.reference)
        console.log("type", msg.type)
        var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
        let modroleid = guildSettings.modroleid

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
            // CHECK IF REPLY
            try {
                if (msg.reference.channelID === msg.channel.id) {
                    // fetch reply
                    msg.channel.messages.fetch(msg.reference.messageID)
                        .then(message => {
                            const target = message.author.id
                            message.delete()
                        
                        // define stuff
                    let reason = args.slice(0).join(" ")
                    if(!reason){
                        embed.setTitle("Uh oh!")
                        embed.setDescription("Please provide a reason for the ban!")
                        embed.setColor("RED")
                        return msg.channel.send(embed)
                    }
                    let moderator = msg.author
                    msg.guild.members.ban(target, { reason: `Ban issued by: ${moderator.username}. Reason: ${reason}.` })
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
                                type: "Ban"
                            })


                            msg.channel.send({
                                embed: {
                                    footer: {
                                        text: `Moderation | Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
                                    },
                                    color: msg.guild.me.displayColor,
                                    title: "User Banned!",
                                    description: `Successfully banned <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>.\n**Case ID:** ${caseid}`,
                                    timestamp: new Date(),

                                }
                            })
                            embed.setTitle("User Banned")
                            embed.setDescription(`**Member:** ${user}\n**Action Taken:** Ban\n**Reason:** ${reason}\n**Case ID:** ${caseid}`)
                            logchannel.send(embed)

                            try {
                                embed.setTitle(`Banned From ${msg.guild}`)
                                embed.setDescription(`Greetings, ${user}, you have been banned from ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}.\n**Case ID:** ${caseid}`)

                                target.send(embed)
                            } catch {
                                embed.setTitle("Uh oh!")
                                embed.setDescription(`I was able to ban ${user}, however, I was unable to send them a DM due to their privacy settings!`)
                                embed.setColor("RED")
                                msg.channel.send(embed)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            msg.channel.send(`There was an error banning <@${user.id}>.`)

                        }).catch((err) => {
                            console.log(err)
                            embed.setTitle("Uh oh!")
                            embed.setDescription(`An invalid user was supplied!`)
                            embed.setColor("RED")
                            msg.channel.send(embed)
                        })
                    })
                    return
                }
            } catch (err) {
                console.log("It is not a reply.")
            }
            // END REPLY CHECK

            if (!args[0]) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a member you want me to ban!")
                return msg.channel.send(embed)
            }

            let target = msg.mentions.members.first() || args[0]
            let moderator = msg.author
            let reason = args.slice(1).join(" ")


            if (!target) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a member you want me to ban!")
                return msg.channel.send(embed)
            }

            if (!reason) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a reason for the ban!")
                return msg.channel.send(embed)
            }



            msg.guild.members.ban(target, { reason: `Ban issued by: ${moderator.username}. Reason: ${reason}.` })
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
                        type: "Ban"
                    })


                    msg.channel.send({
                        embed: {
                            footer: {
                                text: `Moderation | Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
                            },
                            color: msg.guild.me.displayColor,
                            title: "User Banned!",
                            description: `Successfully banned <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>.\n**Case ID:** ${caseid}`,
                            timestamp: new Date(),

                        }
                    })
                    embed.setTitle("User Banned")
                    embed.setDescription(`**Member:** ${user}\n**Action Taken:** Ban\n**Reason:** ${reason}\n**Case ID:** ${caseid}`)
                    logchannel.send(embed)

                    try {
                        embed.setTitle(`Banned From ${msg.guild}`)
                        embed.setDescription(`Greetings, ${user}, you have been banned from ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}.\n**Case ID:** ${caseid}`)

                        target.send(embed)
                    } catch {
                        embed.setTitle("Uh oh!")
                        embed.setDescription(`I was able to ban ${user}, however, I was unable to send them a DM due to their privacy settings!`)
                        embed.setColor("RED")
                        msg.channel.send(embed)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    msg.channel.send(`There was an error banning that user.`)

                }).catch((err) => {
                    console.log(err)
                    embed.setTitle("Uh oh!")
                    embed.setDescription(`An invalid user was supplied!`)
                    embed.setColor("RED")
                    msg.channel.send(embed)
                })
        }
    }
}

module.exports = Ban

const Unmute = {
    name: "Unmute",
    command: "unmute",
    category: "Moderation",
    description: "Unmute a user.",
    usage: "unmute <user>",
    execute: async function (client, msg, args, embed, guildSettings) {

        const db = require('../util/database.util').guild
        const mutedrole = guildSettings.mutedroleid
        console.log(mutedrole)
        let reason = args.slice(1).join(" ")
        var logchannel = client.channels.cache.get(guildSettings.logchannelid)
        let modroleid = process.env.modroleid
        let moderator = msg.author
        let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0])
        const target = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first()
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
                embed.setDescription("Please provide a member you want me to unmute!")
                return msg.channel.send(embed)
            }


            if (!target) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please sepcify a valid user to unmute!")
                return msg.channel.send(embed)
            }



            if (!reason) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please provide a reason for the unmute!")
                return msg.channel.send(embed)
            }


            target.roles.remove(mutedrole);



            msg.channel.send({
                embed: {

                    footer: {
                        text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
                    },
                    color: msg.guild.me.displayColor,
                    title: "User Unmuted!",
                    description: `Successfully unmuted <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>`,
                    timestamp: new Date(),

                }
            })
            embed.setTitle("User Unmuted")
            embed.setDescription(`**Member:** ${user}\n**Action Taken:** Unmute\n**Reason:** ${reason}\n`)
            logchannel.send(embed)


            try {
                embed.setTitle(`Unmuted From ${msg.guild}`)
                embed.setDescription(`Greetings, ${target}, you have been unmuted from ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}`)

                target.send(embed)
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`I was able to unmute ${target}, however, I was unable to send them a DM due to their privacy settings!`)
                embed.setColor("RED")
                msg.channel.send(embed)
            }
        }

    }
}

module.exports = Unmute


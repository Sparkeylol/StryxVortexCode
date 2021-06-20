const ms = require('ms')


const Mute = {
    name: "Mute",
    command: "mute",
    category: "Moderation",
    description: "Mute a user",
    usage: "mute <@user> <time> <reason>",
    execute: async function(client, msg, args, embed, guildSettings) {
        const target = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
        let reason = args.slice(2).join(" ")
        var logchannel = client.channels.cache.get(guildSettings.logchannelid)
        let modroleid = guildSettings.modroleid
        let moderator = msg.author
        let mutedrole = msg.guild.roles.cache.find(role => role.name === "Muted");


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
        target.roles.add(mutedrole.id);

        


        msg.channel.send({
            embed: {
                footer: {
                    text: `Moderation | Powered by ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
                },
                color: "GREEN",
                title: "User Muted!",
                description: `Successfully muted ${target}.\n**Reason:** ${reason}\n**Duration:** ${ms(ms(time))}\n**Moderator:** <@${moderator.id}>\n`,
                timestamp: new Date(),

            }
        })

        embed.setTitle(`Muted In ${msg.guild}`)
        embed.setDescription(`Greetings, ${target}, you have been muted in ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}.`)
        embed.setColor(`RED`)

        target.send(embed)

        embed.setTitle("User Muted")
        embed.setDescription(`**Member:** ${target}\n**Action Taken:** Mute\n**Reason:** ${reason}\n**Duration:** ${ms(ms(time))}`), //**Case ID:** ${caseid}`)
        embed.setColor(`RED`)
         logchannel.send(embed)
       
        setTimeout(function(){
            target.roles.remove(mutedrole.id)
            embed.setTitle("User Unmuted")
            embed.setDescription(`**Member:** ${target}\n**Action Taken:** Auto Unmuted\n**Reason:** Mute Time Expired (${ms(ms(time))})\n**Duration:**\n${ms(ms(time))}`)
            embed.setColor(`GREEN`)
            logchannel.send(embed)
           
        embed.setTitle(`Unmuted In ${msg.guild}`)
        embed.setDescription(`Greetings, ${target}, you have been unmuted in ${msg.guild}.\n\n**Reason:** Mute duration expired.`)
        embed.setColor(`RED`)

        target.send(embed)

        }, ms(time));
    }
}
}
module.exports = Mute
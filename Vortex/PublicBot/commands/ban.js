    const Ban = {
        name: "Ban",
        command: "ban",
        category: "Moderation",
        description: "Ban a user",
        usage: "ban <@user> [reason]",
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
                embed.setDescription("Please provide a member you want me to ban!")
                return msg.channel.send(embed)
            }

            let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0])
            let moderator = msg.author
            let reason = args.slice(1).join(" ")
            var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
            let modroleid = guildSettings.modroleid

            if (!user) {
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

        
           
            let target = msg.guild.members.cache.get(user.id)



            embed.setTitle(`Banned From ${msg.guild}`)
            embed.setDescription(`Greetings, ${target}, you have been banned from ${msg.guild}.\n\n**Reason:** ${reason}\n**Moderator:** ${moderator}.\n`)
            embed.setColor(`RED`)

            await target.send(embed)


            target.ban({ reason: `Ban issued by: ${moderator.username}. Reason: ${reason}.`})
                .then((user) => {
                    msg.channel.send({
                        embed: {
                            footer: {
                                text: `Moderation | Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
                            },
                            color: "GREEN",
                            title: "User Banned!",
                            description: `Successfully banned    <@${user.id}>.\n**Reason:** ${reason}\n**Moderator:** <@${moderator.id}>.`,
                            timestamp: new Date(),

                        }
                    })
                    embed.setTitle("User Banned")
                    embed.setDescription(`**Member:** ${user}\n**Action Taken:** Ban\n**Reason:** ${reason}\nCase ID: ${caseid}`)
                    embed.setColor(`RED`)
                    logchannel.send(embed)
                })
                .catch((err) => {
                    console.log(err)
                    msg.channel.send(`There was an error banning <@${user.id}>.`)
                    embeds.setTitle("Uh oh!")
                    embed.setDescription(`There was an error banning <@${iser.id}>.\n\n**Debugging:**\n||${err}||`)
                })    
                }
            }
    }

    module.exports = Ban
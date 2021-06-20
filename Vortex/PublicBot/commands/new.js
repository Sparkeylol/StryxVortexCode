const New = {
    name: "New",
    command: "new",
    category: "Tickets",
    description: "Open a ticket.",
    usage: "new",
    execute: async function(client, msg, args, embed, guildSettings) {
        const number = Math.floor(Math.random() * 9999) + 1;
        const user = msg.author
        const supportteamroleID = guildSettings.supportteamid
        var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)

        if (!guildSettings.ticketcadid || !guildSettings.supportteamid){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure the ticket settings and/or the Log Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {
        embed.setTitle("Please specify the reason for opening a new ticket!")
        embed.setFooter(`Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/700000077460144154/788111812071129148/Vortex_HQ_Logo.png')
        embed.setColor("#4B0082")
        embed.setTimestamp()
        const DM = await msg.channel.send(embed)
        const collector = DM.channel.createMessageCollector(t => t.author.id === msg.author.id, {max: 1})
        collector.on('collect', async victum1 => {
            const ticketreason = victum1.content

                            

            msg.guild.channels.create(`ticket-${msg.member.displayName}`, {
                type: 'text'
            }).then((channel) => {
                const categoryid = guildSettings.ticketcadid
                const channelid = channel.id
                channel.setParent(categoryid)

                // update permissions
                channel.overwritePermissions([
                    {
                        id: `${msg.guild.id}`,
                        allow: [],
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
                        deny: []
                    },
                    {
                        id: supportteamroleID,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
                        deny: []
                    }
                ])

                msg.channel.send({embed :{

                    footer: {
                        text: `Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
                    },
                    color: "4B0082",
                    title: "Got It!",
                    description: `I've gone ahead and opened a ticket for you!\n\n Channel: <#${channelid}>.`,
        
                } })
                channel.send({
                content: `<@&${supportteamroleID}> || <@${user.id}>`,
                embed :{

                    footer: {
                        text: `Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
                    },
                    color: "GREEN",
                    title: `A Ticket Has Been Opened By: ${msg.member.displayName}!`,
                    description: `**${ticketreason}**`
        
                } })

                logchannel.send({embed :{
                        footer: {
                            text: `Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
                        },
                        color: "GREEN",
                        title: "New Ticket!",
                        description: `Ticket Reason: ${ticketreason}\n\nUser: <@${user.id}>`,
                        timestamp: new Date()
                    } 
                })
                    

            })
        })
 }
}
}
module.exports = New
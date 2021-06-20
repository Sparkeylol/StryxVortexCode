const Close = {
    name: "Close",
    command: "close",
    category: "Tickets",
    description: "Close a ticket",
    usage: "close",
    execute: async function(client, msg, args, embed, guildSettings) {
        const channel = msg.channel
        const channelname = msg.channel.name
        var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
        const user = msg.author
        var channelc = msg.channel
        const supportteamid = guildSettings.supportteamid


        if (!guildSettings.supportteamid || !guildSettings.logchannelid){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to set the Support Team Role ID and/or the Log Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        
    } else {
        if (!msg.member.roles.cache.has(`${supportteamid}`)) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription(`You must have the <@&${supportteamid}> role to use this command!`)
            return msg.channel.send(embed)
        }


        const splitname = channelname.split("-")

        var ticketnumber = splitname[1]

        if (splitname[0] !== 'ticket') {
            embed.setTitle("Uh oh!")
            embed.setDescription(`I'm only able to close tickets! ${msg.channel} is not a ticket.`)
            embed.setColor("RED")
            msg.channel.send(embed)
            return
        }else {
            if (msg.member.roles.cache.has(`${supportteamid}`)) {


              msg.delete()
                channel.send("This ticket has been marked resolved! This channel will be deleted in 5 seconds.")

                embed.setTitle("Ticket Closed!")
                embed.setColor("GREEN")
                embed.setDescription(`Ticket User: ${ticketnumber}\n\nResponsible Support Agent: <@${user.id}>`)

                logchannel.send(embed)

                setTimeout(function () {
                    channel.delete()
                }, 5000);
                
            } else {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription(`You need to have the <&${supportteamid}> role to use this command.`)
                return msg.channel.send(embed)
            }
        }

    }
  }
}
  module.exports = Close
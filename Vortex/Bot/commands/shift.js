const Shift = {
    name: "Shift",
    command: "shift",
    category: "Sessions",
    description: "Start a shift.",
    usage: "shift",
    execute: async function(client, msg, args, embed, guildSettings) {

        if (!guildSettings.sessions.shifts.create || !guildSettings.sessions.shifts.channel){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure the shift command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/sessions).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {

        if (!msg.member.roles.cache.has(`${guildSettings.sessions.shifts.create}`)) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription(`You must have the <@&${guildSettings.sessions.shifts.create}> role to use this command!`)
            return msg.channel.send(embed)
        }


        var postchannel = client.channels.cache.get(`${guildSettings.sessions.shifts.channel}`)


postchannel.send(`<@&${guildSettings.sessions.shifts.role}>,`)
        embed.setTitle(guildSettings.sessions.shifts.title)
        embed.setDescription(guildSettings.sessions.shifts.text)
        embed.setColor(guildSettings.sessions.shifts.color)
        postchannel.send(embed)


        embed.setTitle("Posted!")
        embed.setDescription(`The shift has been posted in <#${guildSettings.sessions.shifts.channel}>! 🎉`)
        embed.setColor("GREEN")
msg.channel.send(embed)
    }
  }}


module.exports = Shift
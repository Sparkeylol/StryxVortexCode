
const Interview = {
    name: "Interview",
    command: "interview",
    category: "Sessions",
    description: "Start an interview.",
    usage: "interview",
    execute: async function(client, msg, args, embed, guildSettings) {

        if (!guildSettings.sessions.interviews.create || !guildSettings.sessions.interviews.channel){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure the interview command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/sessions).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {

        if (!msg.member.roles.cache.has(`${guildSettings.sessions.interviews.create}`)) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription(`You must have the <@&${guildSettings.sessions.interviews.create}> role to use this command!`)
            return msg.channel.send(embed)
        }


        var postchannel = client.channels.cache.get(`${guildSettings.sessions.interviews.channel}`)


postchannel.send(`<@&${guildSettings.sessions.interviews.role}>,`)
        embed.setTitle(guildSettings.sessions.interviews.title)
        embed.setDescription(guildSettings.sessions.interviews.text)
        embed.setColor(guildSettings.sessions.interviews.color)
        postchannel.send(embed)


        embed.setTitle("Posted!")
        embed.setDescription(`The interview has been posted in <#${guildSettings.sessions.interviews.channel}>! 🎉`)
        embed.setColor("GREEN")
msg.channel.send(embed)
        }
}}


module.exports = Interview
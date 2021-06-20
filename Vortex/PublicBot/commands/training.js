
const Training = {
    name: "Training",
    command: "training",
    category: "Sessions",
    description: "Start a training.",
    usage: "training",
    execute: async function(client, msg, args, embed, guildSettings) {

        if (!guildSettings.sessions.training.create || !guildSettings.sessions.training.channel){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure the training command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/sessions).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {

        if (!msg.member.roles.cache.has(`${guildSettings.sessions.training.create}`)) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription(`You must have the <@&${guildSettings.sessions.training.create}> role to use this command!`)
            return msg.channel.send(embed)
        }


        
        var postchannel = client.channels.cache.get(`${guildSettings.sessions.training.channel}`)


postchannel.send(`<@&${guildSettings.sessions.training.role}>,`)
        embed.setTitle(guildSettings.sessions.training.title)
        embed.setDescription(guildSettings.sessions.training.text)
        embed.setColor(guildSettings.sessions.training.color)
        postchannel.send(embed)


        embed.setTitle("Posted!")
        embed.setDescription(`The training has been posted in <#${guildSettings.sessions.training.channel}>! 🎉`)
        embed.setColor("GREEN")
msg.channel.send(embed)
    }
    }}


module.exports = Training
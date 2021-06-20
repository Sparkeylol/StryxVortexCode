module.exports = {
   name: "Suggest",
   command: "suggest",
   usage: "suggest <suggestion>",
   description: "Send in a suggestion.",
   category: "Utility",
   execute: (client, msg, args, embed, guildSettings) => {

      if (!guildSettings.suggestionid){
         embed.setTitle("Uh oh!")
         embed.setDescription(`A server administrator needs to set the Suggestion Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
         embed.setColor("RED")
         msg.channel.send(embed)
     } else {

      if(!args.length) {
         embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription(`You didn't provide a suggestion to send! Please provide a suggestion.`)
            return msg.channel.send(embed)
      }
      
      let channel = msg.guild.channels.cache.get(`${guildSettings.suggestionid}`)
      const guild = msg.guild.id
      
      if(!channel || typeof channel === undefined) {
         embed.setTitle("Uh oh!")
         embed.setDescription(`The provided suggestion channel ID on the dashboard is invalid. A server admin can change it [here](https://vortexhq.net/servers/${guild}/utility).`)
         embed.setColor("RED")
         embed.setFooter(`Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`)
         return msg.channel.send(embed)
      }
                                                      
      
      embed.setThumbnail(msg.author.avatarURL())
      embed.setColor("#FFD700")
      embed.setDescription(args.join(" "))
      
      channel.send(embed).then(m => {
         m.react('✅')
         m.react('❌')
      })

      
      msg.channel.send({embed: {
      color: "GREEN",
      footer: {
         text: `Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`
      },
         title: "Got It!",
      description: `Your suggestion is now posted in ${channel} for others to vote on!`

}})

}}
}
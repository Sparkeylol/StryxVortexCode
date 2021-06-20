const Suggest = {
   name: "Suggest",
   command: "suggest",
   category: "Utility",
   description: "Send a suggestion.",
   usage: "suggest <suggestion>",
   execute: async function (client, msg, args, embed, guildSettings) {
       const suggestionmodule = require('../util/database.util').suggestion

       if (!guildSettings.suggestionid) {
           embed.setTitle("Uh oh!")
           embed.setDescription(`A server administrator needs to set the Suggestion Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
           embed.setColor("RED")
           msg.channel.send(embed)
       } else {

           if (!args.length) {
               embed.setTitle("Uh oh!")
               embed.setColor(15158332)
               embed.setDescription(`You didn't provide a suggestion to send! Please provide a suggestion.`)
               return msg.channel.send(embed)
           }
           const suggestion = args.join(" ")
           let channel = msg.guild.channels.cache.get(`${guildSettings.suggestionid}`)
           const guild = msg.guild.id
           if (!channel || typeof channel === undefined) {
               embed.setTitle("Uh oh!")
               embed.setDescription(`The provided suggestion channel ID on the dashboard is invalid. A server admin can change it [here](https://vortexhq.net/servers/${guild}/utility).`)
               embed.setColor("RED")
               embed.setFooter(`Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`)
               return msg.channel.send(embed)
           }
           embed.setTitle("Got it!")
           embed.setDescription(`Your suggestion is now posted in ${channel} for others to vote on!`)
           embed.setColor("GREEN")
           msg.channel.send(embed)
           // if no yet
           
               const test = await suggestionmodule.findOne({ guild: msg.guild.id })
              if (test === null) {
                   suggestionmodule.create({ guild: msg.guild.id, user: msg.author.id, suggestion: suggestion, id: 0, status: "Pending Review", userusername: msg.author.username, useravatar: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}` })
               }
           

           try {
               console.log(test.id)
           } catch {
               embed.setTitle("Uh oh!")
               embed.setDescription("Due to this being the first server suggestion, we had to setup a few things. Please redo the suggestion!")
               embed.setColor("RED")
               return msg.channel.send(embed)
           }
           const idstofind = await suggestionmodule.findOne({ guild: msg.guild.id }).sort({"id": -1})
           const ids = idstofind.id + 1
           // send suggestion jehwrbt
           embed.setTitle("New Suggestion! 🗒️")
           embed.setThumbnail(msg.author.avatarURL())
           embed.setDescription(`${suggestion}`)
           embed.setFooter(`Suggestion ID: ${ids}`)
           embed.addField("Suggestion Status", "Pending Review")
           embed.setColor(msg.guild.me.displayColor)
           channel.send(embed).then(m => {
               const idofmsg = m.id
               console.log(idofmsg)
               m.react('👍')
               m.react('🤷')
               m.react('👎')
           


           // if yes
           suggestionmodule.create({ guild: msg.guild.id, user: msg.author.id, suggestion: suggestion, id: ids, status: "Pending Review", msgid: idofmsg, userusername: msg.author.username, useravatar: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}` })

       })


       }
   }
}

module.exports = Suggest
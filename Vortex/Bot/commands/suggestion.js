const Suggestion = {
    name: "Suggestion",
    command: "suggestion",
    category: "Utility",
    description: "Review a suggestion.",
    usage: "suggestion <id> <approve/deny/consider> <message>",
    execute: async function (client, msg, args, embed, guildSettings) {
        const Discord = require('discord.js');
        const suggestionmodule = require('../util/database.util').suggestion
        if (!guildSettings.suggestionid) {
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to set the Suggestion Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
            embed.setColor("RED")
            msg.channel.send(embed)
        } else {

            if (!msg.member.roles.cache.has(`${guildSettings.modroleid}`)) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription(`You must have the <@&${guildSettings.modroleid}> role to use this command!`)
                return msg.channel.send(embed)
            }

            if (!args.length) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please specify if you wish to `approve`, `deny`, or `consider` a suggestion!")
                return msg.channel.send(embed)
            }
            if (!args[1]) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please specify the message ID for the suggestion!")
                return msg.channel.send(embed)
            }
            if (!args[2]) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription("Please specify the review note for the suggestion!")
                return msg.channel.send(embed)
            }

            let channel = msg.guild.channels.cache.get(`${guildSettings.suggestionid}`)
            const guild = msg.guild.id

            const fId = args[1]
            try {
                await suggestionmodule.findOne({ guild: msg.guild.id, id: fId })
            } catch {
                embed.setTitle("Uh oh!")
                embed.setDescription(`I was unable to find that suggestion, please see the image below to learn how to locate a suggestion ID.`)
                embed.setColor("RED")
                embed.setImage(`https://cdn.discordapp.com/attachments/700000077460144154/819048903919665173/unknown.png`)
                return msg.channel.send(embed)
            }
            const fetching = await suggestionmodule.findOne({ guild: msg.guild.id, id: fId })
            const updateSuggestion = fetching.suggestion
            const updateMsgId = fetching.msgid
            const updateId = fetching.id
            const updateUser = fetching.user
            const updateUsername = fetching.userusername
            const updatePfp = fetching.useravatar


            if (args[0].toLowerCase() === "deny") {
                channel.messages.fetch(updateMsgId).then(m => {
                    m.embeds.forEach((embed) => {
                        const denied = new Discord.MessageEmbed()
                            .setFooter(`Suggestion ID: ${updateId}`)
                            .setTimestamp()
                            .setThumbnail(updatePfp)
                            .setAuthor(updateUsername, updatePfp)
                            .setColor("RED")
                            .setDescription(updateSuggestion)
                            .setTitle(`Suggestion Denied`)
                            .addField(`Suggestion Denied By ${msg.author.tag} (${msg.author.id})`, args.slice(2).join(" "))
                        m.edit(denied)
                        m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                    })
                    suggestionmodule.findOneAndUpdate({ id: updateId }, {
                        status: "Denied",

                    })
                })
                client.users.fetch(updateUser).then((user) => {
                    embed.setTitle("Suggestion Updated")
                    embed.setDescription(`Hello, <@${updateUser}>! Your suggestion in ${msg.guild.name} has had it's status updated. Click **[here]( https://discord.com/channels/${msg.guild.id}/${guildSettings.suggestionid}/${updateMsgId})** to view it!`)
                    embed.setColor("GREEN")
                    user.send(embed).catch(() => {
                        console.log("Their DMs are off.")
                     }) 
                });
                msg.delete()
                embed.setTitle("Got it!")
                embed.setDescription("I've set that suggestion under `denied`! This message will be deleted in 5 seconds.")
                msg.channel.send(embed).then(tod => {
                    tod.delete({ timeout: 5000 })
                })
            }

            if (args[0].toLowerCase() === "consider") {
                channel.messages.fetch(updateMsgId).then(m => {
                    const considered = new Discord.MessageEmbed()
                        .setFooter(`Suggestion ID: ${updateId}`)
                        .setTimestamp()
                        .setThumbnail(updatePfp)
                        .setAuthor(updateUsername, updatePfp)
                        .setColor("ORANGE")
                        .setDescription(updateSuggestion)
                        .setTitle(`Suggestion Considered`)
                        .addField(`Suggestion Considered By ${msg.author.tag} (${msg.author.id})`, args.slice(2).join(" "))
                    m.edit(considered)
                    m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                })
                suggestionmodule.findOneAndUpdate({ id: updateId }, {
                    status: "Considered",

                })
                client.users.fetch(updateUser).then((user) => {
                    embed.setTitle("Suggestion Updated")
                    embed.setDescription(`Hello, <@${updateUser}>! Your suggestion in ${msg.guild.name} has had it's status updated. Click **[here]( https://discord.com/channels/${msg.guild.id}/${guildSettings.suggestionid}/${updateMsgId})** to view it!`)
                    embed.setColor("GREEN")
                    user.send(embed).catch(() => {
                        console.log("Their DMs are off.")
                     }) 
                });
                msg.delete()
                embed.setTitle("Got it!")
                embed.setDescription("I've set that suggestion under `considered`! This message will be dleeted in 5 seconds.")
                msg.channel.send(embed).then(tod => {
                    tod.delete({ timeout: 5000 })
                })
            }

            if (args[0].toLowerCase() === "approve") {
                channel.messages.fetch(updateMsgId).then(m => {
                    const approved = new Discord.MessageEmbed()
                        .setFooter(`Suggestion ID: ${updateId}`)
                        .setTimestamp()
                        .setThumbnail(updatePfp)
                        .setAuthor(updateUsername, updatePfp)
                        .setColor("GREEN")
                        .setDescription(updateSuggestion)
                        .setTitle(`Suggestion Approved`)
                        .addField(`Suggestion Approved By ${msg.author.tag} (${msg.author.id})`, args.slice(2).join(" "))
                    m.edit(approved)
                    m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                })
                suggestionmodule.findOneAndUpdate({ id: updateId }, {
                    status: "Approved",

                })

                client.users.fetch(updateUser).then((user) => {
                    embed.setTitle("Suggestion Updated")
                    embed.setDescription(`Hello, <@${updateUser}>! Your suggestion in ${msg.guild.name} has had it's status updated. Click **[here]( https://discord.com/channels/${msg.guild.id}/${guildSettings.suggestionid}/${updateMsgId})** to view it!`)
                    embed.setColor("GREEN")
                    user.send(embed).catch(() => {
                        console.log("Their DMs are off.")
                     }) 
                });
                msg.delete()
                embed.setTitle("Got it!")
                embed.setDescription("I've set that suggestion under `approved`! This message will be deleted in 5 seconds.")
                msg.channel.send(embed).then(tod => {
                    tod.delete({ timeout: 5000 })
                })
            }

        }
    }
}
module.exports = Suggestion
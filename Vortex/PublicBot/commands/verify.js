const linked = require('../util/database.util').linked

const noblox = require('noblox.js')

var randomWords = require('random-words');

const Verify = {
    name: "Verify",
    command: "verify",
    category: "Roblox",
    description: "Connect your Roblox account to your Discord account.",
    usage: "verify <username>",
    execute: async function(client, msg, args, embed, guildSettings) {
        let exists = await linked.findOne({
            discordId: msg.author.id
        })

        if (exists) {
            embed.setTitle("Verification")
            embed.setDescription("You've already verified! Giving you your roles now...")
            embed.setColor("GREEN")
            embed.setTimestamp()

            let groupRole = await noblox.getRankNameInGroup(guildSettings.roblox.groupid, exists.robloxId)

            let discordRole = msg.guild.roles.cache.find(role => role.name === groupRole)
    
            if (!discordRole) {
                discordRole = await msg.guild.roles.create({
                    data: {
                        name: groupRole
                    }
                })
            }

            let groupRoles = await noblox.getRoles(guildSettings.roblox.groupid)

            msg.member.roles.add(discordRole)

            embed.addField("Roles Given", groupRole)

            return msg.channel.send(embed)
        }

        const emotes = randomWords({ exactly: 8, join: ' ' })

        embed.setTitle("Verification")
        embed.setDescription("Please provide your Roblox username!")
        embed.setColor("GREEN")
        embed.setTimestamp()

        msg.channel.send(embed)

        msg.channel.createMessageCollector(t => t.author.id === msg.author.id, {max:1})
            .on('collect', async username => {
                client.verification.push({
                    discord: msg.author.id,
                    roblox: username.content,
                    code: emotes
                })

                embed.setDescription("Please set your Roblox status to: `"+emotes+"`, then say `done` when done.")

                msg.channel.send(embed)
                msg.channel.createMessageCollector(t => t.author.id === msg.author.id, {max:1})
                    .on('collect', async done => {
                        if (done.content.toLowerCase() === "done") {
                            let user = client.verification.find(v => v.discord === msg.author.id)
                            let userid = await noblox.getIdFromUsername(user.roblox)
                            let status = await noblox.getStatus(userid)
                            let groupRole = await noblox.getRankNameInGroup(guildSettings.roblox.groupid, userid)

                            let discordRole = msg.guild.roles.cache.find(role => role.name === groupRole)        
            
                            if (status !== emotes) {
                                embed.setDescription("Your Roblox status is not correct!")
                                embed.setColor("RED")
                                embed.setTimestamp()
                                return msg.channel.send(embed)
                            }

                            await linked.create({
                                discordId: msg.author.id,
                                robloxId: userid
                            })
            
                            msg.member.roles.add(discordRole)
            
                            embed.setTitle("Verification")
                            embed.setDescription(`Succesfully linked and given roles to ${msg.author}`)
                            embed.addField("Roles Added", groupRole)
                            msg.channel.send(embed)
            
                        }
                    })

            })
    } 
  }
  module.exports = Verify
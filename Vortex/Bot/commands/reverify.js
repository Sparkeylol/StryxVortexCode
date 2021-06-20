const linked = require('../util/database.util').linked

const noblox = require('noblox.js')

var randomWords = require('random-words');

const ReVerify = {
    name: "Reverify",
    command: "reverify",
    category: "Roblox",
    description: "Reconnect your Roblox account to your Discord account.",
    usage: "reverify",
    execute: async function (client, msg, args, embed, guildSettings) {
        
        var randomEmoji = require('random-emoji');
        const linked = require('../util/database.util').linked
        const noblox = require("noblox.js")
       
      
            const e = await linked.findOne({ discordId: msg.author.id })
            if(e === null){
                embed.setTitle("Uh oh!")
            embed.setDescription("You're not yet verified yet! Please use the ``" + guildSettings.prefix + "verify`` command to verify!")
            return msg.channel.send(embed)
            }  
       
                const emojis = randomEmoji.random({ count: 5 })
                const emojiList = emojis.map((emoji) => emoji.character).join(' ')
                embed.setTitle("Let's verify! 👍")
                embed.setDescription(`What's your Roblox username?`)
                msg.channel.send(embed)
                msg.channel.createMessageCollector(t => t.author.id === msg.author.id, { max: 1 })
                    .on('collect', async username => {
                        if (username.content.toLowerCase() === "cancel") {
                            embed.setTitle("Got it!")
                            embed.setDescription(`I've ended the verification process.`)
                            return msg.channel.send(embed)
                        }
                        try {
                            await noblox.getIdFromUsername(username.content)
                            const id = await noblox.getIdFromUsername(username.content)
                        } catch {
                            embed.setTitle("Uh oh!")
                            embed.setDescription("The username you entered is invalid, you'll need to run the `" + guildSettings.prefix + "verify` command again.")
                            embed.setColor("RED")
                            msg.channel.send(embed)
                            return
                        }
                        embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username.content}`)
                        embed.setDescription("Lovely, please add the following emojis to your Roblox Bio, ``" + emojiList + "``, then say `done` when you're done!")
                        msg.channel.send(embed)
                        msg.channel.send("For mobile users, use these emojis: ``" + emojiList + "``")

                        msg.channel.createMessageCollector(t => t.author.id === msg.author.id, { max: 1 })
                            .on('collect', async done => {
                                if (done.content.toLowerCase() === "cancel") {
                                    embed.setTitle("Got it!")
                                    embed.setDescription(`I've ended the verification process.`)
                                    msg.channel.send(embed)
                                    return
                                }
                                if (done.content.toLowerCase() === "done") {
                                    const idtocheck = await noblox.getIdFromUsername(username.content)
                                    const finaluser = await noblox.getUsernameFromId(idtocheck)
                                    let blurb = await noblox.getBlurb({ userId: idtocheck })
                                    if (blurb.includes(emojiList)) {
                                        embed.setTitle("You're verified! 🎉")
                                        embed.setDescription(`Thank you for verifying, ${finaluser}! ` + "Please use ``" + guildSettings.prefix + "getroles`` to update your roles!")
                                        msg.channel.send(embed)
                                        const rankName = await noblox.getRankNameInGroup(guildSettings.roblox.groupid, idtocheck)
                                        msg.member.setNickname(finaluser)
                                        await linked.findOneAndDelete({ discordId: msg.author.id })
                                        linked.create({
                                            discordId: msg.author.id,
                                            robloxId: idtocheck,
                                            previousRole: rankName,
                                            status: "yes"
                                        })
                                    } else {
                                        embed.setTitle("Uh oh!")
                                        embed.setDescription(`I was unable to find the emojis in your bio. ` + "Please use ``" + guildSettings.prefix + "verify`` to redo the verification process!")
                                        embed.setColor("RED")
                                        return msg.channel.send(embed)
                                    }
                                }
                            })





                    })
                //ask for username
               // all above is fetching bloxlink junk

        // all above is posting a msg if they're verified already with bloxlink




     
    }}

module.exports = ReVerify
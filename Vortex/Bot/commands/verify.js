const linked = require('../util/database.util').linked


const axios = require('axios');

const Verify = {
    name: "Verify",
    command: "verify",
    category: "Roblox",
    description: "Connect your Roblox account to your Discord account.",
    usage: "verify",
    execute: async function (client, msg, args, embed, guildSettings) {
        let role = msg.guild.roles.cache.find(r => r.name === "Verified");
        var randomEmoji = require('random-emoji');
        const linked = require('../util/database.util').linked
        const noblox = require("noblox.js")
        const axios = require('axios');
        await axios.get(`https://api.blox.link/v1/user/${msg.author.id}`).then(async (res) => {

            let r = res.data
            if (r.status === "error") {
                console.log(r.error)
            }
            var check = await linked.findOne({ discordId: msg.author.id })

            
            try {
                if (check.status === "yes") {
                    let firstuser = await noblox.getUsernameFromId(check.robloxId)
                    try {
                        msg.member.setNickname(firstuser)
                       } catch (err) {
                           console.log(err)
                           embed.setTitle("Uh oh!")
                           embed.setdescription("I was unable to update your username, please ensure I have permissions to do so! I'm unable to update the username of the server owner.")
                           embed.setColor("RED")
                           msg.channel.send(embed)
                       }
                embed.setTitle("Hey there! :wave:")
                embed.setDescription(`Welcome to ${msg.guild.name}, ${firstuser}!` + " To update your roles, please use ``" + guildSettings.prefix + "getroles``! You're currently linked with our database! To verify as another account, please use the ``" + guildSettings.prefix + "reverify`` command!")
                msg.member.roles.add(role)
                return msg.channel.send(embed)
                }}catch (err) {
                console.log("Not verified with db yet.")
                console.log(err)
                }
            if (r.status === "ok") {
                const username = await noblox.getUsernameFromId(r.primaryAccount)
                embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`)
                embed.setTitle("Hey there! :wave:")
                embed.setDescription(`Welcome to ${msg.guild.name}, ${username}!` + " To update your roles, please use ``" + guildSettings.prefix + "getroles``! You're currently linked with Bloxlink! To verify as another account, please use the ``" + guildSettings.prefix + "reverify`` command!")
                msg.member.roles.add(role)
                msg.member.setNickname(username)
                 msg.channel.send(embed)
                const rankNamee = await noblox.getRankNameInGroup(guildSettings.roblox.groupid, r.primaryAccount)
                linked.create({
                    discordId: msg.author.id,
                    robloxId: r.primaryAccount,
                    previousRole: rankNamee,
                    status: "yes"
                })
                return
            } else {


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
                                        linked.create({
                                            discordId: msg.author.id,
                                            robloxId: idtocheck,
                                            previousRole: rankName,
                                            status: "yes"
                                        })
                                        msg.member.roles.add(role)
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
            }

        })   // all above is fetching bloxlink junk

        // all above is posting a msg if they're verified already with bloxlink





    }
}


module.exports = Verify
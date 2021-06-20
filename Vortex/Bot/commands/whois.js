const roblox = require('noblox.js');

const bloxy = require("bloxy")

const linked = require('../util/database.util').linked

const Discord = require('discord.js');

const Whois = {
    name: "whois",
    command: "whois",
    category: "Verification",
    description: "Get a users roblox info.",
    usage: "whois <username>",
    execute: async function (client, msg, args, embed, guildSettings) {
        const clientb = new bloxy.Client({
            credentials: {
                cookie: guildSettings.roblox.cookie
            }
        });
        try {
            await clientb.login();
        } catch (err) {
            embed.setTitle("Uh oh!")
            embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        }

        var check = await linked.findOne({ discordId: msg.author.id })



        if (msg.guild.members.cache.get(args[0]) || msg.mentions.users.first()) {
            let user = msg.guild.members.cache.get(args[0]) || msg.mentions.users.first()


            var checkforuser = await linked.findOne({ discordId: user.id })
   
            if (user) {
                if (await linked.findOne({ discordId: user.id })) {
                    msg.channel.startTyping();
                    if (checkforuser.status === "yes") {
                        let id = checkforuser.robloxId
                        const groupidd = guildSettings.roblox.groupid
                        const rankId = await roblox.getRankNameInGroup(groupidd, id)
                        let followers = await roblox.getFollowers(id)
                        const userInfo = await clientb.getUser(id)
                        const avatar = await roblox.getAvatar(id)
                        let blurb = await roblox.getBlurb({ userId: id })
                        const hasPremium = await roblox.getPremium(id)
                        const presence = await roblox.getPresences([id])
                        let groups = await roblox.getGroups(id)
                        let firstuser = await roblox.getUsernameFromId(checkforuser.robloxId)

                        embed.setColor(msg.guild.me.displayColor)
                        embed.setTitle(`${firstuser}`)
                        embed.setURL(`https://www.roblox.com/users/${id}/profile`)
                        embed.setDescription(blurb)
                        embed.addField("Followers", userInfo.followersCount, true)
                        embed.addField("Following", userInfo.followingCount, true)
                        embed.addField("Friends", userInfo.friendsCount, true)
                        embed.addField("Status", userInfo.status, true)
                        embed.addField("Premium Status", hasPremium, true)
                        embed.addField("Group Count", groups.length, true)
                        embed.addField("Rank In Group", rankId, true)
                        embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${firstuser}`)
                        msg.channel.send(embed)
                        return msg.channel.stopTyping()
                    }
                }
            } else {
                embed.setTitle("Uh oh!")
                embed.setDescription("That user isn't linked with our database.")
                embed.setColor("RED")
                return msg.channel.send(embed)
            }
        } else {
            if (!args[0]) {
                if (await linked.findOne({ discordId: msg.author.id })) {
                    if (check.status === "yes") {
                        msg.channel.startTyping();
                        let id = check.robloxId
                        const groupidd = guildSettings.roblox.groupid
                        const rankId = await roblox.getRankNameInGroup(groupidd, id)
                        let followers = await roblox.getFollowers(id)
                        const userInfo = await clientb.getUser(id)
                        const avatar = await roblox.getAvatar(id)
                        let blurb = await roblox.getBlurb({ userId: id })
                        const hasPremium = await roblox.getPremium(id)
                        const presence = await roblox.getPresences([id])
                        let groups = await roblox.getGroups(id)
                        let firstuser = await roblox.getUsernameFromId(check.robloxId)
                        embed.setColor(msg.guild.me.displayColor)
                        embed.setTitle(`${firstuser}`)
                        embed.setURL(`https://www.roblox.com/users/${id}/profile`)
                        embed.setDescription(blurb)
                        embed.addField("Followers", userInfo.followersCount, true)
                        embed.addField("Following", userInfo.followingCount, true)
                        embed.addField("Friends", userInfo.friendsCount, true)
                        embed.addField("Status", userInfo.status, true)
                        embed.addField("Premium Status", hasPremium, true)
                        embed.addField("Group Count", groups.length, true)
                        embed.addField("Rank In Group", rankId, true)
                        embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${firstuser}`)
                        msg.channel.send(embed)
                        return msg.channel.stopTyping();
                    }
                }
            } else {

                let username = args[0];
                if (!username) {
                    embed.setTitle("Uh oh!")
                    embed.setDescription("Please specfiy a username!")
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
                let id;
                try {
                    id = await roblox.getIdFromUsername(username);
                } catch {
                    embed.setTitle("Uh oh!")
                    embed.setDescription("Hm.. ``" + username + "`` isn't a valid Roblox username.")
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }

                msg.channel.startTyping()
                const rgroupid = guildSettings.roblox.groupid
                const rankId = await roblox.getRankNameInGroup(rgroupid, id)
                let followers = await roblox.getFollowers(id)
                const userInfo = await clientb.getUser(id)
                const avatar = await roblox.getAvatar(id)
                let blurb = await roblox.getBlurb({ userId: id })
                const hasPremium = await roblox.getPremium(id)
                const presence = await roblox.getPresences([id])
                let groups = await roblox.getGroups(id)
                embed.setColor(msg.guild.me.displayColor)
                embed.setTitle(`${username}`)
                embed.setURL(`https://www.roblox.com/users/${id}/profile`)
                embed.setDescription(blurb)
                embed.addField("Followers", userInfo.followersCount, true)
                embed.addField("Following", userInfo.followingCount, true)
                embed.addField("Friends", userInfo.friendsCount, true)
                embed.addField("Status", userInfo.status, true)
                embed.addField("Premium Status", hasPremium, true)
                embed.addField("Group Count", groups.length, true)
                embed.addField("Rank In Group", rankId, true)
                embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`)
                msg.channel.send(embed)
                return msg.channel.stopTyping();
            }
        }
    }
}
module.exports = Whois
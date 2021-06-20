const Whois = {
    name: "whois",
    command: "whois",
    category: "Verification",
    description: "Get a users roblox info.",
    usage: "whois <username>",
    execute: async function(client, msg, args, embed, guildSettings) {


        const roblox = require('noblox.js');

        const bloxy = require("bloxy")
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
        let username = args[0];
        if(!username){
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
                embed.setDescription(`Hm.. ${username} isn't a valid Roblox username.`)
        }

        const rgroupid = guildSettings.roblox.groupid


        const rankId = await roblox.getRankNameInGroup(rgroupid, id)
        let followers = await roblox.getFollowers(id)
        const userInfo = await clientb.getUser(id)
        const avatar = await roblox.getAvatar(id)
        let blurb = await roblox.getBlurb({userId: id})
        embed.setTitle(`${username}`)
        embed.setURL(`https://www.roblox.com/users/${id}/profile`)
        embed.setDescription(blurb)
        embed.addField("Followers", userInfo.followersCount, true)
        embed.addField("Following", userInfo.followingCount, true)
        embed.addField("Friends", userInfo.friendsCount, true)
        embed.addField("Status", userInfo.status, true)
        embed.addField("Rank In Group", rankId)
        embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`)
        msg.channel.send(embed)



    }
}
module.exports = Whois
const Currentshout = {
    name: "Currentshout",
    command: "currentshout",
    category: "Roblox",
    description: "Get the current group shout.",
    usage: "currentshout",
    execute: async function(client, msg, args, embed, guildSettings) {

if (!guildSettings.roblox.cookie){
    embed.setTitle("Uh oh!")
    embed.setDescription(`A server administrator needs to configure this command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
    embed.setColor("RED")
    return msg.channel.send(embed)
} else {
    
    
    roblox = require("noblox.js")

    try {
        await roblox.setCookie(guildSettings.roblox.cookie)
    } catch {
        embed.setTitle("Uh oh!")
        embed.setDescription(`The Roblox cookie is invalid. This can be fixed [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
        embed.setColor("RED")
        return msg.channel.send(embed)    
    }

    const groupid = guildSettings.roblox.groupid
    const groupShout = await roblox.getShout(groupid)

    embed.setTitle("Group Shout")
    embed.setDescription(`The current [group](https://www.roblox.com/groups/${groupid}) shout is:\n`
    + `\`\`\`${groupShout.body}\`\`\`\nPosted by: ${groupShout.poster.username}.`)
    msg.channel.send(embed)
    }}
}
module.exports = Currentshout
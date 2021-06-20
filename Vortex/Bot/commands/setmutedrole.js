const Setmutedrole = {
    name: "Setmutedrole",
    command: "setmutedrole",
    category: "Moderation",
    description: "Set the muted role.",
    usage: "setmutedrole <role>",
    execute: async function(client, msg, args, embed, guildSettings) {

        const stuff = require('../util/database.util').guild

        
        let rolehere = msg.mentions.roles.first()
        
        
        await stuff.findOneAndUpdate({ guildid: msg.guild.id }, { mutedroleid: rolehere })
        embed.setTitle("Got it!")
        embed.setDescription(`I've updated your Muted Role ID to ${rolehere}!`)
        msg.channel.send(embed)
        console.log(guildSettings.mutedroleid)
    

    }}
module.exports = Setmutedrole
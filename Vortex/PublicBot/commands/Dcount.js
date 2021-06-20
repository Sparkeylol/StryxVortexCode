const Dcount = {
    name: "Discord Count",
    command: "dcount",
    category: "Utility",
    description: "Displays the Discord Member count",
    usage: "dcount",
    execute: async function(client, msg, args, embed, guildSettings) {
        console.log("?")
        const members = await msg.guild.memberCount
        embed.setTitle("Discord Member Count")
        embed.addField("Members", `${members} members in our Discord!  Requested by ${msg.author.tag}.`)
        embed.setColor("GREEN")
        msg.channel.send(embed)
    }
  }
  
  module.exports = Dcount
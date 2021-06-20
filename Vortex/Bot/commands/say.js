const Say = {
  name: "Say",
  command: "say",
  category: "Utility",
  description: "Have the bot repeat what you say.",
  usage: "say <channel> <msg>",
  execute: async function(client, msg, args, embed, guildSettings) {

    if (msg.member.hasPermission('MANAGE_MESSAGES')){
      
      msg.delete()

      message = args.join(" ");
      return msg.channel.send(message)
      
    } else {
  
      embed.setTitle("Uh Oh!")
      embed.setColor("RED")
      embed.setDescription(`You must have the <@&${guildSettings.modroleid}> role to use this command!`)
      msg.channel.send(embed)
    }
  }
}

module.exports = Say
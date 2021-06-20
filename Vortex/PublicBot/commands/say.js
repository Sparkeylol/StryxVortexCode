const Say = {
  name: "Say",
  command: "say",
  category: "Utility",
  description: "Have the bot repeat what you say.",
  usage: "say <channel> <msg>",
  execute: async function(client, msg, args, embed, guildSettings) {

    msg.delete()
    if (msg.member.hasPermission('MANAGE_MESSAGES')){
      

      message = args.join(" ");
      return msg.channel.send(message)
      
    } else {
      embed.setTitle("Uh Oh!")
      embed.setColor("RED")
      embed.setDescription("You do not have permisison to use this command! Missing permission: `MANAGE_MESSAGES`.")
      msg.channel.send(embed)
    }
  }
}

module.exports = Say
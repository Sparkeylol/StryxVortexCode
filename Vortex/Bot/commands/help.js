function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const Help = {
  name: "Help",
  command: "help",
  category: "Utility",
  description: "Displays Help Commands",
  usage: "help",
  execute: async function(client, msg, args, embed, guildSettings) {
      let categories = ["roblox", "moderation", "utility", "tickets", "sessions", "fun"]
      embed.setDescription("The full command list is found [here](https://help.stryx.cloud/en/articles/4916982-command-list). If you need anything else, please join our [Support Server](https://discord.gg/cbRSPFc6TV)!")
      if (!args[0]) {
          categories.forEach(category => {
              // let cmds = client.commands.filter(command => command.command === category.command)
  
              embed.addField(toTitleCase(category), "Use `"+guildSettings.prefix+"help "+toTitleCase(category)+"` to view commands.", true)
              embed.setColor("GREEN")
          })
      } else {
          if (!categories.includes(args[0].toLowerCase())) {
              embed.setDescription(`Hm.. I was unable to find that category! Please say ${guildSettings.prefix}help to see a list of categories.`)
              embed.setColor("ff0000")
          }
          let cmds = client.commands.filter(command => command.category.toLowerCase() === args[0].toLowerCase())
          cmds.each(cmd => {
              embed.addField(cmd.name, `Command: \`${cmd.command}\`\nDescription: ${cmd.description}\nUsage: \`${cmd.usage}\`\n\n`)
              embed.setColor("GREEN")
          })
      }
      embed.setTitle("Command List")
      msg.channel.send(embed)
  }
}

module.exports = Help
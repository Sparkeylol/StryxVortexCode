const { Inhibitor } = require('discord-akairo');
const db = require('../util/database');

class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super('blacklist', {
      reason: 'blacklist',
      type: 'all',
    })
  }

  async exec(message) {
    const blacklist = await db.blacklist.findFirst({
      where: {
        userId: message.author.id
      }
    })

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmdExists = this.client.commandHandler.findCommand(command)

    if (blacklist) {
      if (cmdExists) {
        message.channel.send({embed: {
          color: 16733013,
          description: "Hey there! Sadly, you're blacklisted from using Stryx services. You may open a ticket via our [live chat](https://stryx.cloud) for more information.",
          author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
          }
        }})
      }
      return true
    } else {
      return false
    }
  }
}

module.exports = BlacklistInhibitor;

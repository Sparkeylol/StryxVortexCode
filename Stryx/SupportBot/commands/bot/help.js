const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

class HelpCommand extends Command {
    constructor() {
        super('help', {
           aliases: ['help', 'commands', 'cmds'],
           description: {
            content: 'Displays a list of available command, or detailed information for a specific command.',
            usage: '[command]'
           },
           category: 'bot',
           ratelimit: 2,
           args: [
            {
              id: 'command',
              type: 'commandAlias'
            }
          ]
        });
    }

    async exec(msg, { command }) {
      const prefix = this.handler.prefix
      let embed = new MessageEmbed();

      if (!command) {
        embed.addField('❯  Commands', `A list of available commands.\nFor additional info on a command, type \`${prefix}help <command>\`, or view the [Command List](https://help.stryx.cloud/en/articles/4916982-command-list).`)

        for (const category of this.client.commandHandler.categories.values()) {
          embed.addField(`❯  ${category.id.replace(/(\b\w)/gi, (lc) => lc.toUpperCase())}`, `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(' ')}`)
        }

        return msg.channel.send(embed)
      }

      embed.setTitle(`\`${command.aliases[0]}${command.description.usage ? ' ' + command.description.usage : ''}\``)
      embed.addField('❯  Description', `${command.description.content ? command.description.content : ''} ${command.description.ownerOnly ? '\n**[Bot Owner Only]**': ''}`);


      if (command.aliases.length > 1) embed.addField('❯  Aliases', `\`${command.aliases.join('` `')}\``, true);
      if (command.description.examples && command.description.examples.length) embed.addField('❯  Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true);

      return msg.channel.send(embed)
    }
}

module.exports = HelpCommand;

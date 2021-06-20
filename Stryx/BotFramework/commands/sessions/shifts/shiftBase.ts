import { Command, Flag } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../../src/client';

class ShiftBaseCommand extends Command {
  constructor() {
    super('shiftBase', {
      category: 'bot',
      cooldown: 5000,
      aliases: ['shift', 'shifts'],
    });
  }

  * args(): unknown {
    const method = yield {
      type: [
        // ['module-id', 'subcommand']
        ['create-shift', 'create'],
        ['conclude-shift', 'conclude'],
        ['slock-shift', 'slock', 'lock'],
      ],
      otherwise: (msg: Message) => {
        const { guild } = this.client as StryxClient;

        const embed = new MessageEmbed();

        embed.setTimestamp();
        embed.setTitle('Invalid Subcommand');
        embed.setDescription(`Check \`${guild?.settings.prefix}help sessions\` for more information.`);
        embed.setColor(guild?.settings.constants.colors.error as string);
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

        msg.channel.send(embed);
      },
    };

    return Flag.continue(method);
  }

  async exec(msg: Message) {
    msg.reply('yup');
  }
}

module.exports = ShiftBaseCommand;

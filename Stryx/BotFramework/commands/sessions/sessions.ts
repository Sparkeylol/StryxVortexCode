import { Command, Flag } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

class SessionsCommand extends Command {
  constructor() {
    super('sessions', {
      aliases: ['sessions'],
      description: {
        content: 'Start a new session.',
        usage: '<interview/shift/training> <create/conclude/slock>',
      },
      category: 'bot',
      cooldown: 5000,
    });
  }

  * args(): unknown {
    const method = yield {
      type: [
        ['interviewBase', 'interview'],
        ['shiftBase', 'shift'],
        ['trainingBase', 'training'],
      ],
      otherwise: (msg: Message) => {
        const embed = new MessageEmbed();

        const { guild } = this.client as StryxClient;

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
}

module.exports = SessionsCommand;

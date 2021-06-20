import { Command } from 'discord-akairo';
import { MessageEmbed, Message, GuildMember } from 'discord.js';
import StryxClient from '../../src/client';

import db from '../../src/database';

class HistoryCommand extends Command {
  constructor() {
    super('history', {
      aliases: ['history'],
      description: {
        content: 'Get a user\'s moderation history.',
        ownerOnly: false,
        usage: '',
      },
      args: [
        {
          id: 'user',
          type: 'user',
        },
      ],
      category: 'bot',
      cooldown: 5000,
    });
  }

  async exec(msg: Message, { user }: { user: GuildMember }) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    if (!user) {
      const errorEmbed = new MessageEmbed();
      errorEmbed.setTitle('Uh oh!');
      errorEmbed.setDescription('No user was provided.');
      errorEmbed.setColor(guild?.settings.constants.colors.error as string);
      errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      errorEmbed.setTimestamp();
      return msg.channel.send(errorEmbed);
    }

    if (!guild?.settings.modules.logging.channel
      || !msg.guild?.channels.cache.get(guild?.settings.modules.logging.channel)) {
      const errorEmbed = new MessageEmbed();
      errorEmbed.setTitle('Uh oh!');
      errorEmbed.setDescription('The logging channel is invalid. This event will not be logged.');
      errorEmbed.setColor(guild?.settings.constants.colors.error as string);
      errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      errorEmbed.setTimestamp();
      msg.channel.send(errorEmbed);
    }

    const history = await db.cases.findMany({
      where: {
        offender: user.id,
      },
    });

    history.forEach((event) => {
      embed.addField(`Case ${event.caseId} - ${event.type}`, event.reason);
    });

    embed.setTitle('User Moderation History');
    embed.setDescription(`Here's the moderation history for ${user}`);
    embed.setColor(guild?.settings.constants.colors.success as string);

    return msg.channel.send(embed);
  }
}

module.exports = HistoryCommand;

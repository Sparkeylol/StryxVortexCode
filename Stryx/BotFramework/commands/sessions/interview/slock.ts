import { Command } from 'discord-akairo';
import {
  Message,
  MessageEmbed,
} from 'discord.js';
import pupa from 'pupa';
import StryxClient from '../../../src/client';

class LockInterviewCommand extends Command {
  constructor() {
    super('slock-interview', {
      category: 'bot',
      cooldown: 5000,
    });
  }

  async exec(msg: Message) {
    // eslint-disable-next-line prefer-const
    let { guild, sessions } = this.client as StryxClient;

    if (sessions.some((session) => session.type === 'interview')) {
      const activeSession = sessions.find((session) => session.type === 'interview');

      const slockedInterview = new MessageEmbed();

      slockedInterview.setTitle(
        pupa(guild?.settings.modules.sessions.interviews.embeds.slock.title as string, {
          locker: msg.author.username,
        }),
      );

      slockedInterview.setDescription(
        pupa(guild?.settings.modules.sessions.interviews.embeds.slock.description as string, {
          locker: msg.author.username,
        }),
      );

      slockedInterview.setColor(
        guild?.settings.modules.sessions.interviews.embeds.slock.hexColor as string,
      );
      slockedInterview.setTimestamp();

      activeSession?.message.edit(slockedInterview);

      sessions = sessions.filter((session) => session.type !== 'interview');

      const embed = new MessageEmbed();

      embed.setTitle('Locked Interview!');
      embed.setColor(guild?.settings.constants.colors.success as string);
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();

      msg.channel.send(embed);
    }
  }
}

module.exports = LockInterviewCommand;

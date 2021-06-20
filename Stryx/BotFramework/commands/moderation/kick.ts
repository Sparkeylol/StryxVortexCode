import { Command } from 'discord-akairo';
import { MessageEmbed, GuildMember, Message } from 'discord.js';
import StryxClient from '../../src/client';

import db from '../../src/database';

class KickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick'],
      description: {
        content: 'Kick a user with an optional reason.',
        ownerOnly: false,
        usage: '<@user> [reason]',
      },
      args: [
        {
          id: 'user',
          type: 'member',
        },
        {
          id: 'reason',
          type: 'string',
          match: 'rest',
        },
      ],
      category: 'moderation',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message, { user, reason }: { user: GuildMember, reason: string }) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    function generateCaseId() {
      return Math.floor(Math.random() * (9999999999 - 100000000 + 1) + 100000000);
    }

    const caseId = generateCaseId();

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

    if (!user) {
      const errorEmbed = new MessageEmbed();
      errorEmbed.setTitle('Uh oh!');
      errorEmbed.setDescription('You must provide a guild member to kick.');
      errorEmbed.setColor(guild?.settings.constants.colors.error as string);
      errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      errorEmbed.setTimestamp();
      return msg.channel.send(errorEmbed);
    }

    try {
      try {
        const dmEmbed = new MessageEmbed();
        dmEmbed.setTitle(`Kicked from ${msg.guild?.name}`);
        dmEmbed.setDescription(`Hey there <@${user.id}>! You've been banned from ${msg.guild?.name}.`);
        dmEmbed.addField('Reason', (reason || 'None Provided.'), true);
        dmEmbed.addField('Moderator', `<@${msg.author.id}>`, true);
        dmEmbed.addField('Case ID', caseId, true);
        dmEmbed.setColor(guild?.settings.constants.colors.info as string);
        dmEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        dmEmbed.setTimestamp();
        user.send(embed);
      } catch (err) {
        const errorEmbed = new MessageEmbed();
        errorEmbed.setTitle('Uh oh!');
        errorEmbed.setDescription('The user was kicked, but their DMs are off, so I couldn\'t DM them.');
        errorEmbed.setColor(guild?.settings.constants.colors.warning as string);
        errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        errorEmbed.setTimestamp();
        msg.channel.send(errorEmbed);
      } finally {
        await user.kick(`Ban issued by: ${msg.author.username}.${reason ? ` Reason: ${reason}` : ''}`);
      }
    } catch (err) {
      const errorEmbed = new MessageEmbed();
      errorEmbed.setTitle('Uh oh!');
      errorEmbed.setDescription('I couldn\'t kick the user!');
      errorEmbed.addField('Error', `${err}`);
      errorEmbed.setColor(guild?.settings.constants.colors.error as string);
      errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      errorEmbed.setTimestamp();
      msg.channel.send(errorEmbed);
    }

    await db.cases.create({
      data: {
        caseId,
        date: new Date(),
        moderator: msg.author.id,
        offender: user.id,
        type: 'Ban',
        reason: (reason || 'None Provided.'),
      },
    });

    embed.setTitle('User Kicked!');
    embed.setDescription(`Successfully banned <@${user.id}>.`);
    embed.addField('Reason', (reason || 'None Provided.'));
    embed.addField('Moderator', `<@${msg.author.id}>`);
    embed.addField('Case ID', caseId);
    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();

    await (this.client as StryxClient).logEvent({
      event: 'User Kicked',
      fields: [
        {
          name: 'User',
          value: `<@${user.id}>`,
          inline: true,
        },
        {
          name: 'Reason',
          value: (reason || 'None Provided.'),
          inline: true,
        },
        {
          name: 'Moderator',
          value: `<@${msg.author.id}>`,
          inline: true,
        },
        {
          name: 'Case ID',
          value: caseId,
          inline: true,
        },
      ],
      user: msg.author,
    });
    return msg.channel.send(embed);
  }
}

module.exports = KickCommand;

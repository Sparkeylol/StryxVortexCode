import { Command } from 'discord-akairo';
import {
  Message,
  MessageEmbed,
  TextChannel,
} from 'discord.js';
import pupa from 'pupa';
import StryxClient from '../../../src/client';

class CreateTrainingCommand extends Command {
  constructor() {
    super('create-training', {
      category: 'bot',
      cooldown: 5000,
    });
  }

  async exec(msg: Message) {
    const { guild, sessions } = this.client as StryxClient;

    if (sessions.some((session) => session.type === 'training')) {
      const errorEmbed = new MessageEmbed();

      errorEmbed.setTitle('A training session is already running!');
      errorEmbed.setColor('RED');
      msg.channel.send(errorEmbed);
      return;
    }

    const channel = msg.guild?.channels.resolve(
      guild?.settings.modules.sessions.training.channel as string,
    ) as TextChannel;

    const embed = new MessageEmbed();

    embed.setTitle(pupa(guild?.settings.modules.sessions.training.embeds.default.title as string,
      {
        host: msg.author.username,
      }));

    embed.setDescription(
      pupa(guild?.settings.modules.sessions.training.embeds.default.description as string, {
        host: msg.author.username,
      }),
    );

    embed.setColor(guild?.settings.modules.sessions.training.embeds.default.hexColor as string);

    const sessionMessage = await channel?.send(`<@&${guild?.settings.modules.sessions.training.role}>`, { embed });

    (this.client as StryxClient).sessions.push({
      host: msg.author,
      type: 'training',
      message: sessionMessage,
      locked: false,
    });

    const successEmbed = new MessageEmbed();

    successEmbed.setTitle('Created new training session!');

    successEmbed.setColor(guild?.settings.constants.colors.success as string);

    successEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

    successEmbed.setTimestamp();

    msg.channel.send(successEmbed);
  }
}

module.exports = CreateTrainingCommand;

import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

class DiscordCountCommand extends Command {
  constructor() {
    super('membercount', {
      aliases: ['membercount', 'dcount'],
      description: {
        content: 'Check the Discord server member count!',
        ownerOnly: false,
      },
      category: 'utility',
      cooldown: 5000,
    });
  }

  async exec(msg: Message) {
    const { guild } = this.client as StryxClient;
    const embed = new MessageEmbed();

    embed.setTitle('Discord Member Count');
    embed.addField('Members', `${await msg.guild?.memberCount} members in our Discord server!`);
    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();
    msg.channel.send(embed);
  }
}

module.exports = DiscordCountCommand;

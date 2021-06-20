import { Command } from 'discord-akairo';
import {
  MessageEmbed,
  Message,
  ColorResolvable,
  TextChannel,
} from 'discord.js';
import StryxClient from '../../src/client';

class EmbedCommand extends Command {
  constructor() {
    super('embed', {
      aliases: ['embed'],
      description: {
        content: 'Send an embed to a channel!',
        ownerOnly: false,
      },
      args: [
        {
          id: 'embedTitle',
          type: 'string',
          prompt: {
            start: (msg: Message) => {
              const embed = new MessageEmbed();
              const { guild } = this.client as StryxClient;

              embed.setTitle("**What's the embed title?**");
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
              embed.setTimestamp();
              embed.setFooter('Say "cancel" to stop this prompt', this.client.user?.avatarURL() as string);
              msg.channel.send(embed);
            },
          },
        },
        {
          id: 'embedDescription',
          type: 'string',
          prompt: {
            start: (msg: Message) => {
              const embed = new MessageEmbed();
              const { guild } = this.client as StryxClient;

              embed.setTitle("**What's the embed description?**");
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
              embed.setTimestamp();
              embed.setFooter('Say "cancel" to stop this prompt', this.client.user?.avatarURL() as string);
              msg.channel.send(embed);
            },
          },
        },
        {
          id: 'embedFooter',
          type: 'string',
          prompt: {
            start: (msg: Message) => {
              const embed = new MessageEmbed();
              const { guild } = this.client as StryxClient;

              embed.setTitle("**What's the embed footer?**");
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
              embed.setTimestamp();
              embed.setFooter('Say "cancel" to stop this prompt', this.client.user?.avatarURL() as string);
              msg.channel.send(embed);
            },
          },
        },
        {
          id: 'embedColor',
          type: 'string',
          prompt: {
            start: (msg: Message) => {
              const embed = new MessageEmbed();
              const { guild } = this.client as StryxClient;

              embed.setTitle("**What's the embed color?**");
              embed.setDescription('You can choose any color, as long as it\'s in the hex format, without the `#`.');
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
              embed.setTimestamp();
              embed.setFooter('Say "cancel" to stop this prompt', this.client.user?.avatarURL() as string);
              msg.channel.send(embed);
            },
          },
        },
        {
          id: 'channel',
          type: 'textChannel',
          prompt: {
            start: (msg: Message) => {
              const embed = new MessageEmbed();
              const { guild } = this.client as StryxClient;

              embed.setTitle('**What channel should I post the embed in?**');
              embed.setDescription('This can be an ID or a channel tag.');
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
              embed.setTimestamp();
              embed.setFooter('Say "cancel" to stop this prompt', this.client.user?.avatarURL() as string);
              msg.channel.send(embed);
            },
          },
        },
      ],
      userPermissions: 'MANAGE_MESSAGES',
      category: 'utility',
      cooldown: 5000,
    });
  }

  async exec(msg: Message, {
    embedTitle, embedDescription, embedFooter, embedColor, channel,
  }: {
    embedTitle: string;
    embedDescription: string;
    embedFooter: string;
    embedColor: string | ColorResolvable;
    channel: TextChannel;
  }) {
    const { guild } = this.client as StryxClient;

    let embed = new MessageEmbed();

    embed.setTitle(embedTitle);
    embed.setDescription(embedDescription);
    embed.setFooter(`${embedFooter}`, this.client.user?.avatarURL() as string);
    embed.setColor(embedColor);

    channel.send(embed);

    embed = new MessageEmbed();

    embed.setTitle('Embed Posted!');
    embed.setDescription(`Your embed has been posted in ${channel}`);
    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();

    msg.channel.send(embed);
  }
}

module.exports = EmbedCommand;

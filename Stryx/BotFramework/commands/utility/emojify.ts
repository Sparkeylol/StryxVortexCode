import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
// shut up eslint
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import emoji from 'discord-emoji-convert';
import StryxClient from '../../src/client';

class EmojifyCommand extends Command {
  constructor() {
    super('emojify', {
      aliases: ['emojify', 'emoji', 'emojitext'],
      description: {
        content: 'Turn a message into emojis!',
        ownerOnly: false,
        usage: '[text]',
      },
      args: [
        {
          id: 'text',
          type: 'string',
          match: 'rest',
        },
      ],
      category: 'utility',
    });
  }

  async exec(msg: Message, { text }: { text: string }) {
    const { guild } = this.client as StryxClient;

    if (!text) {
      const embed = new MessageEmbed();
      embed.setTitle('Uh oh!');
      embed.setColor(guild?.settings.constants.colors.error as string);
      embed.setDescription('Please provide some text for me to convert!');
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();
      return msg.channel.send(embed);
    }

    try {
      await msg.channel.send(emoji.convert(text));
    } catch (e) {
      const embed = new MessageEmbed();
      embed.setTitle('Uh oh!');
      embed.setColor(guild?.settings.constants.colors.error as string);
      embed.setDescription(`I was unable to get emojis for \`${text}\`.\n\nMake sure you didn't use lots of characters, or an emoji. If you want to use an emoji, please use the Unicode version of it. (Put a backslash [\`\\\`] before the emoji name)\nFor example, \`\\:lemon:\``);
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();
      return msg.channel.send(embed);
    }
  }
}

module.exports = EmojifyCommand;

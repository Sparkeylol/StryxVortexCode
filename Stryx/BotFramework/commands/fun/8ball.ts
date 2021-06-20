import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

function Eightball() {
  const responses = [
    'As I see it, yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'It is certain.',
    'It is decidedly so.',
    'Most likely.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Outlook good.',
    'Reply hazy, try again.',
    'Signs point to yes.',
    'Very doubtful.',
    'Without a doubt.',
    'Yes.',
    'Yes – definitely.',
    'You may rely on it.',
  ];
  return responses[Math.floor(Math.random() * responses.length)]
}

class EightballCommand extends Command {
  constructor() {
    super('8ball', {
      aliases: ['8ball', 'eightball'],
      description: {
        content: 'Check the bot\'s ping!',
        ownerOnly: false,
        usage: '<question>',
      },
      args: [
        {
          id: 'question',
          type: 'string',
          match: 'rest',
        },
      ],
      category: 'bot',
      cooldown: 5000,
    });
  }

  async exec(msg: Message, { question }: { question: string }) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    if (!question) {
      embed.setTitle('Uh oh!');
      embed.setDescription('You need to ask a question!');
      embed.setColor(guild?.settings.constants.colors.error as string);
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();
      return msg.channel.send(embed);
    }

    embed.setTitle('8 Ball says... 🎱');
    embed.setDescription(Eightball());
    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();
    return msg.channel.send(embed);
  }
}

module.exports = EightballCommand;

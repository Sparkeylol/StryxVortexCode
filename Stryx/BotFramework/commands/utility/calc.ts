import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import math from 'mathjs';
import StryxClient from '../../src/client';

class CalculatorCommand extends Command {
  constructor() {
    super('calc', {
      aliases: ['calc', 'calculator', 'math', 'cal'],
      description: {
        content: 'Run a math equation',
        ownerOnly: false,
        usage: '[equation]',
      },
      args: [
        {
          id: 'equation',
          type: 'string',
          match: 'rest',
        },
      ],
      category: 'utility',
    });
  }

  async exec(msg: Message, { equation } : { equation: string }) {
    const embed = new MessageEmbed();
    const { guild } = this.client as StryxClient;

    if (!equation) {
      const errorEmbed = new MessageEmbed();
      errorEmbed.setTitle('Uh oh!');
      errorEmbed.setColor(guild?.settings.constants.colors.error as string);
      errorEmbed.setDescription('Please provide a question for me to calculate!');
      errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      errorEmbed.setTimestamp();
      return msg.channel.send(errorEmbed);
    }

    let response;

    try {
      response = math.evaluate(equation);
    } catch (err) {
      const errorEmbed = new MessageEmbed();
      errorEmbed.setTitle('Uh oh!');
      errorEmbed.setColor(guild?.settings.constants.colors.error as string);
      errorEmbed.setDescription('I am unable to provide an answer!');
      errorEmbed.addField('Equation', `\`\`\`\n${equation}\`\`\``);
      errorEmbed.addField('Error', `\`\`\`${err}\`\`\``);
      errorEmbed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      errorEmbed.setTimestamp();
      return msg.channel.send(errorEmbed);
    }

    embed.setTitle('Calculator');
    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.addField('Input', `\`\`\`\n${equation}\`\`\``);
    embed.addField('Output', `\`\`\`${response}\`\`\``);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();
    return msg.channel.send(embed);
  }
}

module.exports = CalculatorCommand;

import { Command } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

class DMCommand extends Command {
  constructor() {
    super('dm', {
      aliases: ['dm', 'message'],
      description: {
        content: 'DM a user from the bot.',
        usage: '<@user> <message>',
        ownerOnly: false,
      },
      args: [
        {
          id: 'user',
          type: 'member',
        },
        {
          id: 'message',
          type: 'string',
          match: 'rest',
        },
      ],
      category: 'utility',
      cooldown: 5000,
    });
  }

  async exec(msg: Message, { user, message }: { user: GuildMember, message: string }) {
    const { guild } = this.client as StryxClient;
    const embed = new MessageEmbed();

    embed.setTimestamp();
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

    if (!user) {
      embed.setTitle('Uh oh!');
      embed.setDescription('Please mention the suer you wish to message!');
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    if (!message) {
      embed.setTitle('Uh oh!');
      embed.setDescription('Please provide a message for the DM!');
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    embed.setTitle(`You've recieved a mesasge from ${msg.author.tag}!`);
    embed.setDescription(message);
    embed.setColor(guild?.settings.constants.colors.default as string);

    try {
      await user.send(embed);
    } catch (err) {
      embed.setTitle('Uh oh!');
      embed.setDescription('There was an error messaging this user.');
      embed.addField('Error', err);
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    embed.setTitle('Got it!');
    embed.setDescription(`I've messaged ${user} with the following message: \n\`\`\`${message}\`\`\``);
    embed.setColor(guild?.settings.constants.colors.success as string);
    msg.channel.send(embed);

    await (this.client as StryxClient).logEvent({
      event: 'DM Action',
      eventData: `${msg.author} has DMed ${user} with the following: \n\`\`\`${message}\`\`\``,
      user: msg.author,
    });
  }
}

module.exports = DMCommand;

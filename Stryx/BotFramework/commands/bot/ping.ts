import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'Check the bot\'s ping!',
        ownerOnly: false,
        usage: '',
      },
      category: 'bot',
      cooldown: 5000,
    });
  }

  async exec(msg: Message) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();
    embed.setTitle('**Fetching Ping...**');
    embed.setColor(guild?.settings.constants.colors.warning as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    msg.channel.send(embed).then((m) => {
      embed.setTitle('**Pong!**');
      embed.addField('API Latency:', `${m.createdTimestamp - msg.createdTimestamp} ms`);
      embed.addField('Bot Latency', `${Math.round(this.client.ws.ping)} ms`);
      embed.setColor(guild?.settings.constants.colors.success as string);
      embed.setTimestamp();
      m.edit(embed);
    });
  }
}

module.exports = PingCommand;

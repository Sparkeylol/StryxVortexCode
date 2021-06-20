import { Command, Listener } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import log from '../src/logger';

class ErrorListener extends Listener {
  constructor() {
    super('error', {
      emitter: 'commandHandler',
      event: 'error',
    });
  }

  exec(error: Error, message: Message, command: Command) {
    if (!command) {
      return log.error(error);
    }
    log.error(`There was an error executing command ${command.id}: `, error);

    const embed = new MessageEmbed();

    embed.setTitle('Uh oh!');
    embed.setDescription('There was an issue running your command. This normally doesn\'t happen. A report has been sent to the Stryx team!');
    embed.setColor('RED');
    embed.setTimestamp();

    embed.addField('Error', error);

    return message.channel.send(embed);
  }
}

module.exports = ErrorListener;

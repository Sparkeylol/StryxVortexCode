import { Command, Listener } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import ms from 'ms';

class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      emitter: 'commandHandler',
      event: 'cooldown',
    });
  }

  exec(msg: Message, command: Command, remaining: number) {
    const embed = new MessageEmbed();

    embed.setTitle('Uh oh!');
    embed.setDescription(`This command is on cooldown! You can run this command again in ${ms(remaining, { long: true })}.`);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setColor('RED');
    embed.setTimestamp();

    msg.channel.send(embed);
  }
}

module.exports = CooldownListener;

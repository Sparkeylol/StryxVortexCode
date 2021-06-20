import { Listener, Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../src/client';

class MissingPermissionsListener extends Listener { // This should be rarely fired.
  constructor() {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions',
    });
  }

  exec(message: Message, command: Command, type: string, missing: any) {
    const embed = new MessageEmbed();
    const { guild } = this.client as StryxClient;

    embed.setTitle('Uh oh!');
    embed.setDescription(`You must have the ${missing} permission to use this command!`);
    embed.setColor(guild?.settings.constants.colors.error as string);
    embed.setAuthor(message.author.username, message.author.avatarURL() as string);
    embed.setTimestamp();
    message.channel.send(embed);
    return true;
  }
}

module.exports = MissingPermissionsListener;

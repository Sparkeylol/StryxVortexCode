import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';

class GetShoutCommand extends Command {
  constructor() {
    super('currentshout', {
      aliases: ['currentshout', 'getshout'],
      description: {
        content: 'Get the current group shout!',
        ownerOnly: false,
        usage: '',
      },
      category: 'roblox',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    embed.setTimestamp();
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

    if (!guild?.settings.modules.roblox.cookie || guild?.settings.modules.roblox.cookie === '') {
      embed.setTitle('Uh oh!');
      embed.setDescription(`The Roblox cookie isn't set! This can be done [here](https://dash.stryx.cloud/workspace/${guild?.botOwner}/bot).`);
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    } if (!guild?.settings.modules.roblox.groupId) {
      embed.setTitle('Uh oh!');
      embed.setDescription(`The Roblox Group ID isn't set! This can be done [here](https://dash.stryx.cloud/workspace/${guild?.botOwner}/bot).`);
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    embed.setTitle('Loading Group Shout...');
    embed.setColor(guild?.settings.constants.colors.warning);
    const m = await msg.channel.send(embed);

    const shout = await roblox.getShout(guild?.settings.modules.roblox.groupId);

    embed.setTitle('Group Shout');
    embed.setDescription(`The current [group](https://roblox.com/groups/${guild?.settings.modules.roblox.groupId}) shout is:\n\`\`\`${shout.body}\`\`\`\nPosted by: ${shout.poster.username}.`);
    embed.setColor(guild?.settings.constants.colors.default);
    return m.edit(embed);
  }
}

module.exports = GetShoutCommand;

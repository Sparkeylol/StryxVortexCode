import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';

class JoinsCommand extends Command {
  constructor() {
    super('joins', {
      aliases: ['joins', 'getjoins', 'joinrequests'],
      description: {
        content: 'Get join requests of the connected group!',
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

    const groupinfo = await roblox.getGroup(guild?.settings.modules.roblox.groupId as number);
    const logo = await roblox.getLogo(guild?.settings.modules.roblox.groupId as number);
    const joins = await roblox.getJoinRequests(
      guild?.settings.modules.roblox.groupId as number,
      'Asc',
    );

    embed.setTitle(`Join Requests for ${groupinfo.name}`);
    if (joins.data.length > 0) {
      joins.data.map(
        (join) => embed.addField(join.requester.username, `User ID: ${join.requester.userId}`),
      );
    } else {
      embed.setDescription('No join requests!');
    }
    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setThumbnail(logo);
    embed.setTimestamp();
    msg.channel.send(embed);
  }
}

module.exports = JoinsCommand;

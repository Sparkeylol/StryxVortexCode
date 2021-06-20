import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';

class GroupCommand extends Command {
  constructor() {
    super('group', {
      aliases: ['group', 'getgroup', 'groupinfo'],
      description: {
        content: 'Get information on the connected group!',
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

    embed.setTitle(`Information for ${groupinfo.name}`);
    embed.setDescription(groupinfo.description);
    embed.addField('Current Shout', groupinfo.shout.body, true);
    embed.addField('Current Member Count', groupinfo.memberCount, true);
    embed.addField('Public Entry Allowed?', groupinfo.publicEntryAllowed, true);
    embed.addField('Group Owner', groupinfo.owner.username, true);
    embed.addField('Group Link', `[Click here](https://www.roblox.com/groups/${groupinfo.id})`, true);
    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setThumbnail(logo);
    msg.channel.send(embed);
  }
}

module.exports = GroupCommand;

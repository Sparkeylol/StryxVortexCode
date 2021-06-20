import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';

import bloxy from 'bloxy';
import StryxClient from '../../src/client';

class GroupFundsCommand extends Command {
  constructor() {
    super('funds', {
      aliases: ['funds', 'groupfunds'],
      description: {
        content: 'Get the group funds!',
        ownerOnly: false,
      },
      category: 'roblox',
      cooldown: 5000,
    });
  }

  async exec(msg: Message) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();

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

    embed.setTitle('Current Group Funds');
    embed.setDescription('Fetching group funds...');
    embed.setColor(guild?.settings.constants.colors.warning as string);
    const m = await msg.channel.send(embed);

    const client = new bloxy.Client({
      credentials: {
        cookie: guild?.settings.modules.roblox.cookie,
      },
    });

    await client.login();

    const funds = await (await client.getGroup(guild?.settings.modules.roblox.groupId)).getFunds();

    embed.setTitle('Current Group Funds');
    embed.setDescription(`The current group funds are **R$${funds}**.`);
    embed.setColor(guild?.settings.constants.colors.default as string);

    return m.edit(embed);
  }
}

module.exports = GroupFundsCommand;

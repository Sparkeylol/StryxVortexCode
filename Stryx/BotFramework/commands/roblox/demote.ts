import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';

import log from '../../src/logger';

class DemoteCommand extends Command {
  constructor() {
    super('demote', {
      aliases: ['demote'],
      description: {
        content: 'Demote a user in your Roblox group',
        ownerOnly: false,
        usage: '<roblox username>',
      },
      args: [
        {
          id: 'robloxUsername',
          type: 'string',
        },
      ],
      category: 'roblox',
      cooldown: 10000,
    });
  }

  async exec(msg: Message, { robloxUsername }: { robloxUsername: string }) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    embed.setTimestamp();
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

    if (!robloxUsername) {
      embed.setTitle('Uh oh!');
      embed.setDescription('No username was given!');
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    if (!guild?.settings.modules.roblox.cookie || guild?.settings.modules.roblox.cookie === '') {
      embed.setTitle('Uh oh!');
      embed.setDescription(`The Roblox cookie isn't set! This can be done [here](https://dash.stryx.cloud/workspace/${guild?.botOwner}/bot).`);
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    } if (!guild?.settings.modules.roblox.groupId) {
      embed.setTitle('Uh oh!');
      embed.setDescription(`The Roblox Group ID isn't set! This can be done [here](https://dash.stryx.cloud/workspace/${guild?.botOwner}/bot).`);
      embed.setColor(guild?.settings.constants.colors.error);
      return msg.channel.send(embed);
    }

    const { groupId } = guild?.settings.modules.roblox;
    let username;
    try {
      username = await roblox.getIdFromUsername(robloxUsername);
    } catch (err) {
      embed.setTitle('Uh oh!');
      embed.setDescription('There was an error demoting this user.');
      embed.addField('Error', err);
      embed.setColor(guild?.settings.constants.colors.error);
      return msg.channel.send(embed);
    }

    let demoteResponse;

    try {
      demoteResponse = await roblox.demote(groupId, username);
    } catch (err) {
      log.error(err);
      embed.setTitle('Uh oh!');
      embed.setDescription('There was an error demoting this user.');
      embed.addField('Error', err);
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    embed.setTitle('Got it!');
    embed.setDescription(`I've demoted **${robloxUsername}** to ${demoteResponse.newRole.name}!`);
    embed.setColor(guild?.settings.constants.colors.success);

    await (this.client as StryxClient).logEvent({
      event: 'User Demoted',
      eventData: `<@${msg.author.id}> has demoted **${username}** to ${demoteResponse.newRole.name}`,
      user: msg.author,
    });

    return msg.channel.send(embed);
  }
}

module.exports = DemoteCommand;

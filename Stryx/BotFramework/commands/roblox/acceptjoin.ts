import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';

class AcceptJoinCommand extends Command {
  constructor() {
    super('acceptjoin', {
      aliases: ['acceptjoin', 'aj', 'accept'],
      description: {
        content: 'Accept a user\'s request to join your group.',
        ownerOnly: false,
        usage: '<roblox id>',
      },
      args: [
        {
          id: 'robloxId',
          type: 'number',
        },
      ],
      category: 'roblox',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message, { robloxId }: { robloxId: number }) {
    const { guild } = this.client as StryxClient;

    const embed = new MessageEmbed();

    embed.setTimestamp();
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

    if (!robloxId) {
      embed.setTitle('Uh oh!');
      embed.setDescription('No Roblox User ID was given!');
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
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    const { groupId } = guild?.settings.modules.roblox;
    const username = await roblox.getUsernameFromId(robloxId);

    try {
      await roblox.handleJoinRequest(groupId, robloxId.toString(), true);
    } catch (err) {
      embed.setTitle('Uh oh!');
      embed.setDescription('There was an error accepting this user.');
      embed.addField('Error', err);
      embed.setColor(guild?.settings.constants.colors.error as string);
      return msg.channel.send(embed);
    }

    embed.setTitle('Got it!');
    embed.setDescription(`I've accepted the join request for **${username}**!`);
    embed.setColor(guild?.settings.constants.colors.success as string);

    await (this.client as StryxClient).logEvent({
      event: 'Join Request Accepted',
      eventData: `<@${msg.author.id}> has accepted **${username}**'s join request.`,
    });
    return msg.channel.send(embed);
  }
}

module.exports = AcceptJoinCommand;

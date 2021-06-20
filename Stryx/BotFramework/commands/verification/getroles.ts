import { Command } from 'discord-akairo';
import { MessageEmbed, Message, Role } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';
import db from '../../src/database';

class GetRolesCommand extends Command {
  constructor() {
    super('getroles', {
      aliases: ['getroles', 'roles', 'gr'],
      description: {
        content: 'Get the roles from the connected Roblox group!',
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

    const linkedUser = await db.linkedAccounts.findFirst({
      where: {
        discordId: msg.author.id,
      },
    });

    if (!linkedUser || linkedUser === null) {
      embed.setTitle('Uh oh!');
      embed.setDescription(`You're not verified yet! Please run \`${guild?.settings.prefix}verify\` first.`);
      return msg.channel.send(embed);
    }

    const robloxUsername = await roblox.getUsernameFromId(parseInt(linkedUser.robloxId, 10));
    embed.setDescription(`Hey there, ${robloxUsername}! I've updated your roles.\n\nTo verify as a new account, please run \`${guild?.settings.prefix}reverify\`.`);
    const groupRole = await roblox.getRankNameInGroup(
      guild?.settings.modules.roblox.groupId as number,
      parseInt(linkedUser.robloxId, 10),
    );

    const previousRole = (
      linkedUser.previousRoles.length > 0 ? linkedUser.previousRoles.filter(
        (servers: any) => servers.guildId === msg.guild?.id,
      )[0] : null
    );

    let discordRole = msg.guild?.roles.cache.find((role) => role.name === groupRole);

    const removeRole = (previousRole !== null ? msg.guild?.roles.cache.find(
      (role) => role.name === previousRole,
    ) : null);

    if (!discordRole) {
      discordRole = await msg.guild?.roles.create({
        data: {
          name: groupRole,
        },
      });
    }

    try {
      let verifiedRole = msg.guild?.roles.cache.find((role) => role.name === 'Verified');

      if (!verifiedRole) {
        verifiedRole = await msg.guild?.roles.create({
          data: {
            name: 'Verified',
          },
        });
      }

      msg.member?.roles.add(verifiedRole as Role);
    } catch {
      // user probably has the role already
    }
    if (removeRole) {
      msg.member?.roles.remove(removeRole);
    }

    msg.member?.roles.add(discordRole as Role);

    embed.addField('Roles Added', groupRole, true);

    if (groupRole !== previousRole && previousRole !== null) {
      msg.member?.roles.remove(removeRole as Role);
      await db.linkedAccounts.update({
        where: {
          id: linkedUser.id,
        },
        data: {
          previousRoles: {
            guildId: msg.guild?.id,
            role: groupRole,
          },
        },
      });
      embed.addField('Roles Removed', (previousRole === '' || previousRole === groupRole ? 'None' : previousRole), true);
    }
    try {
      await msg.member?.setNickname(robloxUsername, `Updated roles for ${msg.author.username}`);
    } catch {
      const errEmbed = new MessageEmbed()
        .setTitle('Uh oh!')
        .setDescription('I was unable to change your nickname. This is either due to me not having permissions or you being the server owner!')
        .setColor('RED')
        .setAuthor(msg.author.username, msg.author.avatarURL() as string)
        .setTimestamp();
      msg.channel.send(errEmbed);
    }

    await db.linkedAccounts.update({
      where: {
        id: linkedUser.id,
      },
      data: {
        previousRoles: {
          guildId: msg.guild?.id,
          role: groupRole,
        },
      },
    });

    return msg.channel.send(embed);
  }
}

module.exports = GetRolesCommand;

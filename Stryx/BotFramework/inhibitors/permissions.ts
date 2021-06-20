import { Inhibitor } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import StryxClient from '../src/client';
import prisma from '../src/database';
import { Guild } from '../src/domain';

export default class PerimissionsInhibitor extends Inhibitor {
  constructor() {
    super('permissions', {
      reason: 'permissions',
      type: 'all',
    });
  }

  // return true to block, false to pass
  async exec(message: Message): Promise<boolean> {
    const guild: Guild = await prisma.guilds.findFirst({
      where: {
        guildId: message.guild?.id,
      },
    }) as unknown as Guild;

    const command = (this.client as StryxClient).commandHandler.findCommand(
      message.content.slice(guild.settings.prefix.length).trim().split(/ +/).shift() as string,
    );

    if (!command || command === undefined) {
      return true;
    }
    // i literally do not know the issue
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const role = guild.settings.permissions[command.id];

    if (!role || role === undefined) {
      return false;
    }
    const hasRole = message.member?.roles.cache.some(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (r: { id: string }) => guild?.settings.permissions[command.id].includes(r.id),
    );

    if (hasRole) {
      return false;
    }

    const embed = new MessageEmbed();

    embed.setTitle('Uh oh!');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    embed.setDescription(`You must have the ${guild.settings.permissions[command.id].map((id: any) => `<@&${id}>`).join(', ')} role${guild.settings.permissions[command.id].length > 1 ? 's' : ''} to use this command!`);
    embed.setColor(guild.settings.constants.colors.error);
    embed.setAuthor(message.author.username, message.author.avatarURL() as string);
    embed.setTimestamp();

    message.channel.send(embed);

    return true;
  }
}

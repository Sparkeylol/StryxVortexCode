import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import roblox from 'noblox.js';
import StryxClient from '../../src/client';

class AuditLogCommand extends Command {
  constructor() {
    super('audit', {
      aliases: ['audit', 'auditlogs', 'al', 'audits'],
      description: {
        content: 'Get the group\'s audit log!',
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

    embed.setTitle('Loading Audit Logs...');
    embed.setColor(guild?.settings.constants.colors.warning);
    const m = await msg.channel.send(embed);

    const rankLogs = await roblox.getAuditLog(guild?.settings.modules.roblox.groupId, '', undefined, 'Asc', 25);

    rankLogs.data.forEach((log) => {
      let finalString = '';
      Object.entries(log.description).forEach(([key, value]) => {
        finalString += `${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: ${value}\n`;
      });
      embed.addField(log.actionType, finalString);
    });

    embed.setTitle('Group Audit Logs');
    embed.setDescription('These are the most recent audit logs!');
    embed.setColor(guild?.settings.constants.colors.default as string);
    return m.edit(embed);
  }
}

module.exports = AuditLogCommand;

import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

import db from '../../src/database';

class ListTicketsCommand extends Command {
  constructor() {
    super('tickets', {
      aliases: ['tickets', 'listtickets', 'ticketlist', 'tl', 'lt'],
      description: {
        content: 'List all the tickets!',
        ownerOnly: false,
        usage: '[category/status] [limit]',
      },
      args: [
        {
          id: 'subcommand',
          type: ['category', 'status'],
        },
        {
          id: 'subcommandArgs',
          type: 'string',
        },
        {
          id: 'limit',
          type: 'number',
          default: 10,
        },
      ],
      category: 'tickets',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message, { subcommand, subcommandArgs, limit }: {
    subcommand: 'category' | 'status';
    subcommandArgs: string;
    limit: 10 | number
  }) {
    const { guild } = this.client as StryxClient;
    const embed = new MessageEmbed();

    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.setTimestamp();

    switch (subcommand) {
      case 'category': {
        embed.setTitle(`Tickets in category \`${subcommandArgs}\``);
        const tickets = await db.tickets.findMany({
          where: {
            type: subcommandArgs,
            status: 'OPEN',
            guildId: msg.guild?.id,
          },
          take: limit as number,
        });
        tickets.forEach(async (ticket) => {
          embed.addField(`Ticket ${ticket.ticketId}`, `Reason: ${ticket.reason}\nStaff Assigned: ${ticket.staffIds.map((staff) => `<@${staff}>`)}\nUser: <@${ticket.userId}>`, true);
        });
        msg.channel.send(embed);
        break;
      }
      case 'status':
        (await db.tickets.findMany({
          where: {
            status: subcommandArgs.toUpperCase(),
            guildId: msg.guild?.id,
          },
          take: limit as number,
        })).forEach(async (ticket) => {
          embed.addField(`Ticket ${ticket.ticketId}`, `Reason: ${ticket.reason}\nStaff Assigned: ${ticket.staffIds.map((staff) => `<@${staff}>`)}\nUser: <@${ticket.userId}>`, true);
        });
        embed.setTitle(`Tickets with status \`${subcommandArgs}\``);
        msg.channel.send(embed);
        break;

      default:
        (await db.tickets.findMany({
          where: {
            guildId: msg.guild?.id,
          },
          take: limit as number,
        })).forEach(async (ticket) => {
          embed.addField(`Ticket ${ticket.ticketId}`, `Reason: ${ticket.reason}\nStaff Assigned: ${ticket.staffIds.map((staff) => `<@${staff}>`)}\nUser: <@${ticket.userId}>`, true);
        });
        embed.setTitle('Tickets');
        msg.channel.send(embed);
        break;
    }
  }
}

module.exports = ListTicketsCommand;

import { tickets } from '@prisma/client';
import { Command } from 'discord-akairo';
import {
  MessageEmbed,
  MessageAttachment,
  Message,
  TextChannel,
} from 'discord.js';
import StryxClient from '../../src/client';
import { Guild } from '../../src/domain';

import db from '../../src/database';

async function CloseTicket(
  msg: Message,
  guild: Guild,
  ticket: tickets,
  embed: MessageEmbed,
) {
  // get all messages
  const channel = msg.guild?.channels.cache.get(ticket.channel as string) as TextChannel;

  const msgs = await channel.messages.fetch();

  const finalMessages = [`Ticket Information:\nTicket Reason: ${ticket.reason}`];

  msgs.forEach((message) => {
    finalMessages.push(`[${message.createdAt.toISOString()}] [${message.id}] ${message.author.tag}: ${message.content} ${message.embeds[0] ? `EMBED: ${JSON.stringify(message.embeds[0])}` : ''}`);
  });

  const attachment = new MessageAttachment(Buffer.from(finalMessages.join('\n')), `${channel.name}.txt`);

  const logChannel = msg.guild?.channels.resolve(guild?.settings.modules.tickets.logChannel);

  channel.send('**This ticket has been marked as resolved! This channel will be deleted in 5 seconds.**');

  embed.setTitle('Ticket closed!');
  embed.setDescription(`Ticket User: <@${ticket.userId}>\n\nSupport Agents: ${ticket.staffIds.map((staff) => `<@${staff}>`)}`);

  (logChannel as TextChannel).send({ embed, files: [attachment] });

  setTimeout(() => {
    channel.delete();
  }, 5000);
}

class CloseTicketCommand extends Command {
  constructor() {
    super('close', {
      aliases: ['close', 'closeticket', 'ct'],
      description: {
        content: 'Close the current ticket from the channel, or add a ticket id to close that ticket.',
        ownerOnly: false,
        usage: '[ticket id]',
      },
      args: [
        {
          id: 'ticketId',
          type: 'number',
        },
      ],
      category: 'tickets',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message, { ticketId }: { ticketId: number }) {
    const { guild } = this.client as StryxClient;
    const embed = new MessageEmbed();

    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.setTimestamp();

    if (ticketId) {
      const ticket = await db.tickets.findFirst({
        where: {
          ticketId,
        },
      });

      if (ticket) {
        CloseTicket(msg, guild as Guild, ticket, embed);
        await db.tickets.update({
          where: {
            id: ticket.id,
          },
          data: {
            status: 'CLOSED',
          },
        });
      }
    } else {
      const ticket = await db.tickets.findFirst({
        where: {
          channel: msg.channel.id,
        },
      });

      if (ticket) {
        CloseTicket(msg, guild as Guild, ticket, embed);

        await db.tickets.update({
          where: {
            id: ticket.id,
          },
          data: {
            status: 'CLOSED',
          },
        });
      }
    }
  }
}

module.exports = CloseTicketCommand;

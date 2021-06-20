import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';

import db from '../../src/database';
import log from '../../src/logger';

class NewTicketCommand extends Command {
  constructor() {
    super('new', {
      aliases: ['new', 'newticket', 'ticket'],
      description: {
        content: 'Create a new ticket by following the prompt.',
        ownerOnly: false,
        usage: '',
      },
      args: [
        {
          id: 'ticketCategory',
          type: async (message, phrase) => {
            if (!phrase) return null;

            if ((this.client as StryxClient)
              .guild?.settings.modules.tickets.categories.includes(phrase)) return null;

            return phrase;
          },
          prompt: {
            start: async (message: Message) => {
              const { guild } = this.client as StryxClient;
              const embed = new MessageEmbed();
              embed.setTitle('New Ticket');
              embed.setDescription('What\'s the ticket category?');
              embed.addField('Accepted Categories:', `\`${guild?.settings.modules.tickets.categories.join(', ')}\``);
              embed.setTimestamp();
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(message.author.username, message.author.avatarURL() as string);
              embed.setFooter('You can cancel this prompt by saying `cancel`.');

              return { embed };
            },
            retry: async (message: Message) => {
              const { guild } = this.client as StryxClient;
              const embed = new MessageEmbed();
              embed.setTitle('New Ticket');
              embed.setDescription('What\'s the ticket category?');
              embed.addField('Accepted Categories:', `\`${guild?.settings.modules.tickets.categories.join(', ')}\``);
              embed.setTimestamp();
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(message.author.username, message.author.avatarURL() as string);
              embed.setFooter('You can cancel this prompt by saying `cancel`.');

              return { embed };
            },
            optional: false,
          },
        },
        {
          id: 'ticketReason',
          type: 'string',
          prompt: {
            start: async (message: Message) => {
              const { guild } = this.client as StryxClient;
              const embed = new MessageEmbed();
              embed.setTitle('New Ticket');
              embed.setDescription('What\'s the ticket reason?');
              embed.setTimestamp();
              embed.setColor(guild?.settings.constants.colors.default as string);
              embed.setAuthor(message.author.username, message.author.avatarURL() as string);
              embed.setFooter('You can cancel this prompt by saying `cancel`.');

              return { embed };
            },
            optional: false,
          },
        },
      ],
      category: 'tickets',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message, { ticketCategory, ticketReason }: {
    ticketCategory: string,
    ticketReason: string
  }) {
    const { guild } = this.client as StryxClient;
    const embed = new MessageEmbed();

    msg.channel.messages.fetch({ limit: 10 }).then((msgs) => { // limit 10 if many are talking
      const message = msgs.filter(
        (m) => (m.author.id === msg.author.id && m.content === ticketReason),
      ).first();
      if (message) {
        msg.channel.messages.delete(message.id); // jank but it works
      }
    }).catch(log.error);

    let channelCategory = guild?.settings.modules.tickets.categoryId || msg.guild?.channels.cache.filter((channel) => (channel.name.toLowerCase() === 'tickets' && channel.type === 'category')).first();

    if (!ticketCategory) {
      channelCategory = (await msg.guild?.channels.create('Tickets', {
        type: 'category',
      }))?.id;
    }

    const dbTicket = await db.tickets.create({
      data: {
        guildId: msg.guild?.id as string,
        userId: msg.author.id,
        staffIds: [],
        reason: ticketReason,
        type: ticketCategory,
      },
    });

    const ticketChannel = await msg.guild?.channels.create(`${ticketCategory}-${msg.author.username.substring(0, 4)}-${dbTicket.ticketId}`, {
      type: 'text',
      topic: `${msg.author.username}'s ticket for: ${ticketReason}`,
      parent: channelCategory,
      permissionOverwrites: [
        {
          id: msg.guild.id,
          allow: [],
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: msg.author.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
          deny: [],
        },
        {
          id: guild?.settings.modules.tickets.role as string,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
          deny: [],
        },
      ],
    });

    await db.tickets.update({
      where: {
        id: dbTicket.id,
      },

      data: {
        channel: ticketChannel?.id,
      },
    });

    embed.setTitle('New Ticket!');
    embed.setDescription(`Ticket created by <@${msg.author.id}>.\n\nTicket Reason: ${ticketReason}`);
    embed.setTimestamp();
    embed.setColor(guild?.settings.constants.colors.success as string);

    ticketChannel?.send(`<@${msg.author.id}> | <@&${guild?.settings.modules.tickets.role}>`, { embed });

    embed.setTitle('New Ticket');
    embed.setDescription('Alright! I\'ve created the ticket.');
    embed.setTimestamp();
    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

    msg.channel.send(embed);
  }
}

module.exports = NewTicketCommand;

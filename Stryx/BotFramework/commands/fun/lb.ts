import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { economy } from '.prisma/client';
import StryxClient from '../../src/client';
import db from '../../src/database';

class LeaderboardCommand extends Command {
  constructor() {
    super('lb', {
      aliases: ['lb', 'leaderboard', 'top10'],
      description: {
        content: 'Check the balance of you or another user.',
        ownerOnly: false,
        usage: '[@user]',
      },
      category: 'fun',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message) {
    const embed = new MessageEmbed();

    const { guild } = this.client as StryxClient;

    const filtered = await db.economy.findMany({
      where: {
        guildId: msg.guild?.id,
      },
    }) as economy[];

    const sorted = filtered.sort((a, b) => (b.cash + b.bank) - (a.cash + a.bank));
    const top10 = sorted.splice(0, 10);

    let username;

    embed.setTitle('Leaderboard');
    embed.setDescription(`Top 10 wealthiest people in ${msg.guild?.name}!`);
    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setTimestamp();
    top10.forEach((data) => {
      username = this.client.users.cache.get(data.userId)?.tag || 'Unknown User';
      embed.addField(username, `Cash: $${data.cash}\nBank: $${data.bank}\nTotal: $${data.cash + data.bank}`);
    });

    msg.channel.send(embed);
  }
}

module.exports = LeaderboardCommand;

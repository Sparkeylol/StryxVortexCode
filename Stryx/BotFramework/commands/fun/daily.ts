import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';
import db from '../../src/database';

class DailyCommand extends Command {
  constructor() {
    super('daily', {
      aliases: ['daily'],
      description: {
        content: 'Get your daily income!',
        ownerOnly: false,
      },
      category: 'fun',
      cooldown: 86400000,
    });
  }

  async exec(msg: Message) {
    const embed = new MessageEmbed();

    const { guild } = this.client as StryxClient;

    function generateMoney() {
      return Math.floor(Math.random() * (200 - 1 + 1) + 1);
    }

    const moneyToAdd = generateMoney();

    embed.setTitle('You found some money! :moneybag:');
    embed.setDescription(`You earned $${moneyToAdd}!`);
    embed.setColor(guild?.settings.constants.colors.default as string);
    msg.channel.send(embed);

    const economyUser = await db.economy.findFirst({
      where: {
        userId: msg.author.id,
        guildId: msg.guild?.id,
      },
    });

    if (!economyUser || economyUser === null) {
      await db.economy.create({
        data: {
          userId: msg.author.id,
          guildId: msg.guild?.id as string,
          cash: moneyToAdd,
          bank: 0,
        },
      });
    } else {
      await db.economy.update({
        where: { id: economyUser.id },
        data: {
          cash: moneyToAdd + economyUser.cash,
        },
      });
    }
  }
}

module.exports = DailyCommand;

import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../src/client';
import db from '../../src/database';

class DepositCommand extends Command {
  constructor() {
    super('deposit', {
      aliases: ['dep', 'deposit'],
      description: {
        content: 'Deposit cash to your bank!',
        ownerOnly: false,
      },
      args: [
        {
          id: 'cash',
          type: 'string' || 'number',
        },
      ],
      category: 'fun',
      cooldown: 10000,
    });
  }

  // eslint-disable-next-line consistent-return
  async exec(msg: Message, { cash }: { cash: string | number }) {
    const embed = new MessageEmbed();

    const { guild } = this.client as StryxClient;

    const user = await db.economy.findFirst({
      where: {
        userId: msg.author.id,
        guildId: msg.guild?.id,
      },
    });

    if (!user || user === null) {
      await db.economy.create({
        data: {
          userId: msg.author.id,
          guildId: msg.guild?.id as string,
          cash: cash as number,
          bank: 0,
        },
      });
    } else {
      if (user.cash <= 0) {
        embed.setTitle('Uh oh!');
        embed.setDescription('The bank declined the transaction as you have no money to deposit!');
        embed.setColor(guild?.settings.constants.colors.error as string);
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        embed.setTimestamp();
        return msg.channel.send(embed);
      }
      if (cash === 'all') {
        embed.setTitle('Got it!');
        embed.setColor(guild?.settings.constants.colors.default as string);
        embed.setTimestamp();
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        embed.setDescription(`The bank approved your transaction. You deposited $${user.cash} into the bank!`);
        await db.economy.update({
          where: {
            id: user.id,
          },
          data: {
            bank: user.bank + user.cash,
            cash: 0,
          },
        });
        return msg.channel.send(embed);
      }

      const depositAmount = parseInt(cash as string, 10);

      if (!depositAmount || depositAmount <= 0) {
        embed.setTitle('Uh oh!');
        embed.setDescription('Please input the amount you wish to deposit!');
        embed.setColor(guild?.settings.constants.colors.error as string);
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        embed.setTimestamp();
        return msg.channel.send(embed);
      }

      if (Number.isNaN(depositAmount)) {
        embed.setTitle('Uh oh!');
        embed.setDescription("The bank doesn't understand the provided deposit amount!");
        embed.setColor(guild?.settings.constants.colors.error as string);
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        embed.setTimestamp();
        return msg.channel.send(embed);
      }

      if (user.cash < depositAmount) {
        embed.setTitle('Uh oh!');
        embed.setDescription("The bank declined the transaction since you're attempting to deposit more money then you have in cash!");
        embed.setColor(guild?.settings.constants.colors.error as string);
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
        embed.setTimestamp();
        return msg.channel.send(embed);
      }

      embed.setTitle('Got it!');
      embed.setDescription(`The bank approved your transaction. You deposited $${depositAmount} into the bank!`);
      embed.setColor(guild?.settings.constants.colors.success as string);
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();

      await db.economy.update({
        where: {
          id: user.id,
        },
        data: {
          cash: user.cash - depositAmount,
          bank: user.bank + depositAmount,
        },
      });

      return msg.channel.send(embed);
    }
  }
}

module.exports = DepositCommand;

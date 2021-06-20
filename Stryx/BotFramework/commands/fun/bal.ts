import { Command } from 'discord-akairo';
import { MessageEmbed, GuildMember, Message } from 'discord.js';
import StryxClient from '../../src/client';
import db from '../../src/database';

class BalanceCommand extends Command {
  constructor() {
    super('bal', {
      aliases: ['bal', 'balance', 'money'],
      description: {
        content: 'Check the balance of you or another user.',
        ownerOnly: false,
        usage: '[@user]',
      },
      args: [
        {
          id: 'user',
          type: 'member',
        },
      ],
      category: 'fun',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message, { user }: { user: GuildMember }) {
    const embed = new MessageEmbed();

    const { guild } = this.client as StryxClient;

    const userEconomy = await db.economy.findFirst({
      where: {
        userId: (user ? user.user.id : msg.author.id),
        guildId: msg.guild?.id,
      },
    });

    if (!userEconomy || userEconomy === null) {
      const createdUserEconomy = await db.economy.create({
        data: {
          userId: msg.author.id,
          guildId: msg.guild?.id as string,
          cash: 0,
          bank: 0,
        },
      });
      embed.setTitle((userEconomy ? `${user.user.username}'s Balance` : 'Your Balance'));
      embed.addField('Cash', `${guild?.settings.modules.fun.economy.currency}${createdUserEconomy.cash}`);
      embed.addField('Bank', `${guild?.settings.modules.fun.economy.currency}${createdUserEconomy.bank}`);
      embed.addField('Total', `${guild?.settings.modules.fun.economy.currency}${createdUserEconomy.bank + createdUserEconomy.cash}`);
      embed.setColor(guild?.settings.constants.colors.success as string);
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();
      return msg.channel.send(embed);
    }
    embed.setTitle((user ? `${user.user.username}'s Balance` : 'Your Balance'));
    embed.addField('Cash', `${guild?.settings.modules.fun.economy.currency}${userEconomy?.cash}`);
    embed.addField('Bank', `${guild?.settings.modules.fun.economy.currency}${userEconomy?.bank}`);
    embed.addField('Total', `${guild?.settings.modules.fun.economy.currency}${userEconomy?.bank + userEconomy?.cash}`);
    embed.setColor(guild?.settings.constants.colors.success as string);
    embed.setTimestamp();
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    return msg.channel.send(embed);
  }
}

module.exports = BalanceCommand;

import { Message } from 'discord.js';
import { Inhibitor } from 'discord-akairo';
import prisma from '../src/database';

export default class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super('blacklist', {
      reason: 'blacklist',
      type: 'all',
    });
  }

  async exec(message: Message): Promise<boolean> {
    const blacklist = await prisma.blacklist.findFirst({
      where: {
        userId: message.author.id,
      },
    });

    if (blacklist) {
      return true;
    }

    return false;
  }
}

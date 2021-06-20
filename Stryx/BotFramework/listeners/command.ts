import { Listener } from 'discord-akairo';
import { NodeVM, VMScript } from 'vm2';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../src/client';
import log from '../src/logger';
import db from '../src/database';

class CommandListener extends Listener {
  constructor() {
    super('message', {
      emitter: 'client',
      event: 'message',
    });
  }

  async exec(msg: Message) {
    const { guild } = this.client as StryxClient;

    // staff ticket tracking

    if (msg.member?.roles.cache.has(guild?.settings.modules.tickets.role as string)) {
      const ticket = await db.tickets.findFirst({ where: { status: 'OPEN', guildId: msg.guild?.id, channel: msg.channel.id } });
      if (ticket) {
        if (!ticket.staffIds.includes(msg.author.id)) {
          await db.tickets.update({
            where: { id: ticket.id },
            data: {
              staffIds: ticket.staffIds,
            },
          });
        }
      }
    }

    // custom command check

    if (!msg.content.startsWith(guild?.settings.prefix as string)) return;
    const args = msg.content.slice(guild?.settings.prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    const cmdExists = (this.client as StryxClient).commandHandler.findCommand(command as string);

    if (!cmdExists) {
      const customCommand = guild?.settings.customCommands.filter(
        (cmd) => cmd.command === command,
      )[0];
      if (customCommand) {
        const vm = new NodeVM({
          sandbox: {
            message: msg,
            args,
            client: this.client,
            embed: new MessageEmbed(),
            guild,
          },
        });

        let script;

        try {
          script = new VMScript(customCommand.code).compile();
        } catch (err) {
          const embed = new MessageEmbed();
          embed.setTitle('Custom Command Failed.');
          embed.setDescription('The custom command failed to compile.');
          embed.addField('Error: ', `\`${err}\``);
          embed.setColor(guild?.settings.constants.colors.error as string);
          msg.channel.send(embed);
          // eslint-disable-next-line consistent-return
          return log.error('Failed to compile VMScript:', err);
        }

        try {
          vm.run(script);
        } catch (err) {
          const embed = new MessageEmbed();
          embed.setTitle('Custom Command Failed.');
          embed.setDescription('The custom command failed to run.');
          embed.addField('Error: ', `\`${err}\``);
          embed.setColor(guild?.settings.constants.colors.error as string);
          msg.channel.send(embed);
          // eslint-disable-next-line consistent-return
          return log.error('Failed to run VMScript:', err);
        }
      }
    } else {
      log.info(`[${this.client.user?.id}] Command ${command} executed by ${msg.author.id}${args.length <= 0 ? '' : ` with arguments: ${args}`}`);
    }
  }
}

module.exports = CommandListener;

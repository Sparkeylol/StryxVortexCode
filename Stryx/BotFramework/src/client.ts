import {
  AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler,
} from 'discord-akairo';
import {
  EmbedField, User, MessageEmbed, TextChannel, GuildMember, Message,
} from 'discord.js';
import roblox from 'noblox.js';
import { Guild } from './domain';
import log from './logger';

interface Session {
  type: 'interview' | 'training' | 'shift'
  locked: false | boolean
  host: User | GuildMember
  message: Message;
}

export default class StryxClient extends AkairoClient {
  commandHandler: CommandHandler;

  inhibitorHandler: InhibitorHandler;

  listenerHandler: ListenerHandler;

  guild: Guild | null;

  // eslint-disable-next-line @typescript-eslint/ban-types
  logEvent: Function;

  sessions: Session[];

  constructor(guild: Guild | null) {
    super({
      ownerID: guild?.botOwner,
    }, {
      disableMentions: 'everyone',
    });

    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: guild?.settings.prefix,
      handleEdits: true,
      commandUtil: true,
      defaultCooldown: 10000,
      allowMention: true,
      blockBots: true,
      blockClient: true,
    });

    if (guild?.settings.modules.roblox.cookie) {
      roblox.setCookie(guild.settings.modules.roblox.cookie);
    }

    this.guild = guild;

    this.logEvent = async (data: {
      event: string,
      user: User,
      eventData: string,
      fields: EmbedField[]
    }) => {
      const channel = await this.channels.fetch(
        this.guild?.settings.modules.logging.channel as string,
      ) as TextChannel;
      const embed = new MessageEmbed();
      embed.setTitle(data.event);
      embed.setDescription(data.eventData);
      embed.setColor(guild?.settings.constants.colors.info as string);
      embed.setTimestamp();
      embed.setAuthor(data.user.username, data.user.avatarURL() as string);
      if (data.fields) {
        embed.addFields(data.fields);
      }
      return channel.send(embed);
    };

    // this.commandHandler.guild = guild;

    this.sessions = [];

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: './inhibitors/',
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/',
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

    this.commandHandler.loadAll();
    log.info(`[${guild?.id}] Loaded commands.`);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.listenerHandler.loadAll();
    log.info(`[${guild?.id}] Loaded listeners.`);

    this.inhibitorHandler.loadAll();
    log.info(`[${guild?.id}] Loaded inhibitors.`);

    // if (guild?.settings.commands) {
    //   log.info(`[${guild.id}] Checking for disabled commands.`);
    //   guild?.settings.commands.forEach((command) => {
    //     log.info(`[${guild.id}] Command ${command} disabled.`);
    //     this.commandHandler.remove(command);
    //   });
    // }
  }
}

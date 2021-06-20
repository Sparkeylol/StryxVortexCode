import { MessageEmbed } from 'discord.js';

export interface Guild {
  id: number;
  guildId: string;
  botOwner: string;
  settings: {
    prefix: string;
    modules: {
      fun: {
        economy: {
          currency: string
        },
        enabled: boolean
      };
      roblox: {
        cookie: string;
        enabled: boolean;
        groupId: number;
        sessions: {
          enabled: boolean;
        },
        verification: {
          enabled: boolean;
        }
      };
      logging: {
        channel: string;
      };
      tickets: {
        enabled: boolean;
        categories: string[];
        categoryId: string;
        logChannel: string;
        role: string;
      };
      utility: {
        enabled: boolean;
      };
      sessions: {
        enabled: boolean;
        interviews: {
          channel: string;
          role: string;
          embeds: {
            default: MessageEmbed;
            slock: MessageEmbed;
          }
        };
        shifts: {
          channel: string;
          role: string;
          embeds: {
            default: MessageEmbed;
            slock: MessageEmbed;
          }
        };
        training: {
          channel: string;
          role: string;
          embeds: {
            default: MessageEmbed;
            slock: MessageEmbed;
          }
        }
      };
    };
    statuses: {
      text: string;
      type: string;
    }[];
    constants: {
      colors: {
        info: string;
        error: string;
        default: string;
        success: string;
        warning: string;
      }
    };
    permissions: {
      dm: string[];
      ban: string[];
      close: string[];
      funds: string[];
      history: string[];
    };
    customCommands: {
      command: string;
      code: string;
    }[];
  };
  botToken: string;
  branding: boolean;
  region: string;
}

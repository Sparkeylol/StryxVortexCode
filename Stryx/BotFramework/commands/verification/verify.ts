/* eslint-disable no-else-return */
import got from 'got';
import { Argument, Command } from 'discord-akairo';
import { MessageEmbed, Message, Role } from 'discord.js';
import roblox from 'noblox.js';
// types don't exist and i dont know how to make a .d.ts :)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import randomEmojis from 'random-emoji';
import log from '../../src/logger';
import db from '../../src/database';
import StryxClient from '../../src/client';

interface BloxlinkResponse {
  status: 'ok' | 'error';
  primaryAccount: string,
  matchingAccount: string | null,
  error: string | null,
}

interface RandomEmojis {
  character: string;
  name: string;
  image: string;
  imageSrc: string;
}

class VerifyCommand extends Command {
  constructor() {
    super('verify', {
      aliases: ['verify', 'linkaccount'],
      description: {
        content: 'Verify and link your Roblox account to Discord!',
        ownerOnly: false,
      },
      category: 'roblox',
      cooldown: 5000,
    });
  }

  async* args(msg: Message) {
    const { guild } = this.client as StryxClient;

    const bloxlink: BloxlinkResponse = await got.get<BloxlinkResponse>(`https://api.blox.link/v1/user/${msg.author.id}`).json();

    const role = msg.guild?.roles.cache.find((r) => r.name === 'Verified');

    const embed = new MessageEmbed();

    if (bloxlink.status === 'error') {
      log.error(bloxlink.error);
    }

    if (bloxlink.status === 'ok') {
      const robloxUser = await roblox.getUsernameFromId(parseInt(bloxlink.primaryAccount, 10));
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${robloxUser}`);
      embed.setTitle('Hey there! :wave:');
      embed.setDescription(`Welcome to ${msg.guild?.name}, ${robloxUser}! To update your roles, please use \`${guild?.settings.prefix}getroles\`! You're currently linked with Bloxlink! To verify as another account, please use the \`${guild?.settings.prefix}reverify\` command!`);
      embed.setColor(guild?.settings.constants.colors.default as string);
      msg.member?.roles.add(role as Role);
      msg.channel.send(embed);
      try {
        await msg.member?.setNickname(robloxUser);
      } catch (e) {
        embed.setTitle('Uh oh!');
        embed.setDescription('I was unable to set your username. Do I have the `MANAGE_MEMBERS` permission?');
        embed.setColor(guild?.settings.constants.colors.error as string);
        msg.channel.send(embed);
      }

      await db.linkedAccounts.create({
        data: {
          robloxId: bloxlink.primaryAccount,
          discordId: msg.author.id,
        },
      });
      return { username: true };
    } else {
      const username: string = yield {
        id: 'username',
        type: async (msg: Message, phrase: string) => {
          if (!phrase) return null;
          try {
            await roblox.getIdFromUsername(phrase);
            return phrase;
          } catch (e) {
            return null;
          }
        },
        prompt: {
          start: (msg: Message) => {
            const embed = new MessageEmbed();
            const { guild } = this.client as StryxClient;

            embed.setTitle("What's your Roblox username?");
            embed.setColor(guild?.settings.constants.colors.default as string);
            embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
            embed.setTimestamp();
            embed.setFooter('Say "cancel" to stop this prompt.', this.client.user?.avatarURL() as string);
            embed.setTimestamp();
            msg.channel.send(embed);
          },
          retry: (msg: Message) => {
            const embed = new MessageEmbed();
            const { guild } = this.client as StryxClient;

            embed.setTitle('Uh oh!');
            embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
            embed.setColor(guild?.settings.constants.colors.error as string);
            embed.setDescription('That username is invalid. Try again.');
            embed.setFooter('Say "cancel" to stop this prompt.', this.client.user?.avatarURL() as string);
            embed.setTimestamp();
            msg.channel.send(embed);
          },
          ended: (msg: Message) => {
            const embed = new MessageEmbed();
            const { guild } = this.client as StryxClient;

            embed.setTitle('Too many retries. Command cancelled.');
            embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
            embed.setColor(guild?.settings.constants.colors.error as string);
            embed.setTimestamp();
            msg.channel.send(embed);
          },
        },
      };

      return { username };
    }
  }

  async exec(msg: Message, { username }: { username: string | boolean }) {
    const { guild } = this.client as StryxClient;

    if (username === true) {
      // already verified through bloxlink
      return;
    }

    const embed = new MessageEmbed();

    embed.setColor(guild?.settings.constants.colors.default as string);
    embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
    embed.setTimestamp();

    const role = msg.guild?.roles.cache.find((r) => r.name === 'Verified');

    const emojis = randomEmojis.random({ count: 5 }) as Array<RandomEmojis>;
    const emojiList = emojis.map((emoji: RandomEmojis) => emoji.character).join(' ');

    embed.setTitle("Let's verify! 👍");
    embed.setDescription(`Please add the following emojis to the top of your Roblox bio!\n\n\`${emojiList}\`\nThen say \`done\` when you are finished! Mobile Users can copy below.`);
    embed.setColor(guild?.settings.constants.colors.default as string);
    const m = await msg.channel.send(embed);
    msg.channel.send(emojis.map((emoji: RandomEmojis) => emoji.character).map((emoji) => `\\${emoji}`).join(' '));

    m.channel.createMessageCollector((t) => t.author.id === msg.author.id, { max: 1 }).on('collect', async (message) => {
      if (message.content.toLowerCase() === 'cancel') {
        embed.setTitle('Got it!');
        embed.setDescription('I\'ve ended the verification process.');
        msg.channel.send(embed);
        return;
      }
      if (message.content.toLowerCase() === 'done') {
        const robloxUserId = await roblox.getIdFromUsername(username as string);

        const blurb = await roblox.getBlurb(robloxUserId);
        if (blurb.includes(emojiList)) {
          embed.setTitle("You're verified! 🎉");
          embed.setDescription(`Thank you for verifying, ${username}! Please use \`${guild?.settings.prefix}getroles\` to update your roles.`);
          embed.setColor(guild?.settings.constants.colors.success as string);
          msg.channel.send(embed);

          await db.linkedAccounts.create({
            data: {
              robloxId: `${robloxUserId}`,
              discordId: msg.author.id,
            },
          });
          msg.member?.roles.add(role as Role);
        }
      } else {
        embed.setTitle('Uh oh!');
        embed.setDescription(`I was unable to find the emojis in your bio! Please use \`${guild?.settings.prefix}verify\` to restart the verification process.`);
        embed.setColor(guild?.settings.constants.colors.error as string);
        // eslint-disable-next-line consistent-return
        return msg.channel.send(embed);
      }
    });
  }
}

module.exports = VerifyCommand;

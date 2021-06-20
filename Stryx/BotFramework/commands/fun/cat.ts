import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import got from 'got';
import StryxClient from '../../src/client';

class CatCommand extends Command {
  constructor() {
    super('cat', {
      aliases: ['cat', 'catpic', 'randomcat'],
      description: {
        content: 'Get a random cat picture!',
        ownerOnly: false,
      },
      category: 'fun',
      cooldown: 10000,
      ratelimit: 2,
    });
  }

  async exec(msg: Message) {
    const embed = new MessageEmbed();
    const { guild } = this.client as StryxClient;

    embed.setTitle('Fetching a random cat...');
    embed.setColor(guild?.settings.constants.colors.warning as string);
    const m = await msg.channel.send(embed);

    const post: any = await got.get('https://www.reddit.com/r/catpictures/random.json').json();

    const { permalink } = post[0].data.children[0].data;
    const memeUrl = `https://reddit.com${permalink}`;
    const memeImage = post[0].data.children[0].data.url;
    const memeTitle = post[0].data.children[0].data.title;
    const memeUpvotes = post[0].data.children[0].data.ups;
    const memeDownvotes = post[0].data.children[0].data.downs;
    const memeNumComments = post[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`);
    embed.setURL(`${memeUrl}`);
    embed.setImage(memeImage);
    embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
    embed.setColor(guild?.settings.constants.colors.default as string);
    return m.edit(embed);
  }
}

module.exports = CatCommand;

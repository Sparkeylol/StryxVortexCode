const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

class MemberCounterCommand extends Command {
    constructor() {
        super('membercounter', {
           aliases: ['membercounter', 'mcounter', 'mc'],
           description: {
             content: 'Create a member counter! DMs only.',
             ownerOnly: false,
             usage: '',
           },
           channel: 'dm',
           args: [
             {
               id: 'groupId',
               type: 'string',
               prompt: {
                 start: msg => {
                  const embed = new MessageEmbed()
                  .setTitle("Please provide the Group ID you wish to wish to use for the member counter.")
                  .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                  .setThumbnail(msg.author.avatarURL())
                  .setColor("#4B0082")
                  .setTimestamp()
                  msg.author.send(embed)
                },
              },
             },
             {
              id: 'webhookUrl',
              type: 'string',
              prompt: {
                start: msg => {
                 const embed = new MessageEmbed()
                 .setTitle("Great! Now please provide your exact webhook URL.")
                 .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                 .setThumbnail(msg.author.avatarURL())
                 .setColor("#4B0082")
                 .setTimestamp()
                 msg.author.send(embed)
               },
             },
            },
            {
              id: 'goal',
              type: (message, phrase) => {
                if (!phrase || isNaN(phrase)) return null;
                const num = parseInt(phrase);
                if (num < 10) return null;
                return num;
              },
              prompt: {
                start: msg => {
                 const embed = new MessageEmbed()
                 .setTitle("Please provide the goal you are trying to reach.")
                 .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                 .setDescription('Must be greater than 10.')
                 .setThumbnail(msg.author.avatarURL())
                 .setColor("#4B0082")
                 .setTimestamp()
                 msg.author.send(embed)
               },
               retry: msg => {
                const embed = new MessageEmbed()
                .setTitle("Invalid Number.")
                .setDescription('Number must be greater than 10.')
                .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                .setThumbnail(msg.author.avatarURL())
                .setColor("#4B0082")
                .setTimestamp()
                msg.author.send(embed)
              },
              ended: msg => {
                let embed = new MessageEmbed()

                embed.setTitle("Too many retries, command has been cancelled.")
                embed.setColor("RED")
                embed.setAuthor(msg.author.username, msg.author.avatarURL())
                embed.setTimestamp()
                msg.channel.send(embed)
              },
             },
            },
            {
              id: 'template',
              type: 'string',
              prompt: {
                start: msg => {
                 const embed = new MessageEmbed()
                 .setTitle("Nice choice! Now please provide a template string for the webhook message.")
                 .setDescription("Example:\n`:tada: | We've reached {current} members! Only {remaining} to go until we hit {goal}.")
                 .addField('Available Variables', '`{current}` - Current Group Members\n`{remaining}` - Remaining group members to goal\n`{goal}` - The goal you set.')
                 .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                 .setThumbnail(msg.author.avatarURL())
                 .setColor("#4B0082")
                 .setTimestamp()
                 msg.author.send(embed)
               },
             },
            },
            {
              id: 'embedColor',
              type: 'string',
              prompt: {
                start: msg => {
                 const embed = new MessageEmbed()
                 .setTitle("Do you want this to be an embed? If so, provide a HEX color (#000000)")
                 .setDescription('Acceptable answers: `no`, `#HEXCOLOR`')
                 .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                 .setThumbnail(msg.author.avatarURL())
                 .setColor("#4B0082")
                 .setTimestamp()
                 msg.author.send(embed)
               },
             },
            },
            {
              id: 'increment',
              type: (message, phrase) => {
                if (!phrase || isNaN(phrase)) return null;
                const num = parseInt(phrase);
                if (num < 10) return null;
                return num;
              },
              prompt: {
                start: msg => {
                  const embed = new MessageEmbed()
                  .setTitle("When you reach your goal, how much do you want the goal to increase by?")
                  .setDescription('Must be greater than 10.')
                  .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                  .setThumbnail(msg.author.avatarURL())
                  .setColor("#4B0082")
                  .setTimestamp()
                  msg.author.send(embed)
                },
                retry: msg => {
                  const embed = new MessageEmbed()
                  .setTitle("Invalid Number.")
                  .setDescription('Number must be greater than 10.')
                  .setFooter("Say `cancel` to cancel. | Powered by Stryx")
                  .setThumbnail(msg.author.avatarURL())
                  .setColor("#4B0082")
                  .setTimestamp()
                  msg.author.send(embed)
                },
                ended: msg => {
                  let embed = new MessageEmbed()

                  embed.setTitle("Too many retries, command has been cancelled.")
                  embed.setColor("RED")
                  embed.setAuthor(msg.author.username, msg.author.avatarURL())
                  embed.setTimestamp()
                  msg.channel.send(embed)
                },
             },
            },
           ],
           category: 'services',
           cooldown: 5000,
        });
    }

    before(message) {
      let first = new MessageEmbed()
      .setTitle("Member Counter Information")
      .setDescription(`Hey there, <@${message.author.id}>! Thanks for taking interest in our free member counter. In order for our system to set this up for you, you'll need to give us some basic information. If any issues occur, you'll hear from us. Otherwise, you'll see our member counter in action!`)
      .setFooter("Powered by Stryx")
      .setThumbnail(message.author.avatarURL())
      .setColor("#add8e6")
      .setTimestamp()
      message.channel.send(first)
    }

    async exec(msg, { groupId, webhookUrl, goal, template, embedColor, increment }) {
      try {
        await db.memberCounters.create({
          data: {
            ownerId: msg.author.id,
            groupId,
            webhookUrl,
            goal,
            template: (embedColor !== "no" ? {
              content: template,
              color: embedColor
            } : {
              content: template
            }),
            isEmbed: (embedColor !== "no" ? true : false),
            increment,
            current: 0
          }
        })
      } catch (e) {
        let embed = new MessageEmbed();
        embed.setTitle("There was an error creating your Member Counter.")
        embed.setDescription(e)
        embed.setColor('RED')
        embed.setAuthor(msg.author.username, msg.author.avatarURL())
        embed.setFooter('Powered by Stryx.cloud', this.client.user.avatarURL())
        embed.setTimestamp()

        return msg.channel.send(embed)

      }

      let embed = new MessageEmbed();
      embed.setTitle("Member Counter Created!")
      embed.setColor('GREEN')
      embed.setAuthor(msg.author.username, msg.author.avatarURL())
      embed.setFooter('Powered by Stryx.cloud', this.client.user.avatarURL())
      embed.setTimestamp()

      msg.channel.send(embed)
    }
}

module.exports = MemberCounterCommand;

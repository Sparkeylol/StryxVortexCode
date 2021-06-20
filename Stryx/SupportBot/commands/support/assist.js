const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

class AssistCommand extends Command {
    constructor() {
        super('assist', {
           aliases: ['assist'],
           description: {
             content: 'Post an embed to assist people.',
             ownerOnly: false,
             usage: '<document>'
           },
           args: [
             {
               id: 'document',
               type: ['redeem', 'order']
             }
           ],
           category: 'support',
           cooldown: 5000,
        });
    }

    userPermissions(message) {
      if (!message.member.roles.cache.some(role =>["[🙋] Conversational Support Department", "[🍭] Team Lead", "[🎓] Board Of Directors"].includes(role.name))) {
          message.channel.send({
            content: `<@` + message.author.id + `>,`,
            embed: {
            title: "Uh oh!",
            description: "Your rank doesn't allow you to preform this command!",
            color: "RED",
            footer: "Stryx Support"
          }})
          return 'CS, TL, BOD';
      }

      return null;
    }

    async exec(msg, { document }) {
      if (document === "redeem"){
        return msg.channel.send({embed: {
          title: "How To Redeem A Bot Code",
          color: "GREEN",
          description: "Redeeming a bot code is made very simple! If you paid with PayPal, check your email to get the code. If you paid with Robux, you need to copy the code from our Roblox Hub which you get after purchase.\n\n**1** - After that, head [here](https://vortexhq.net/)! That will take you to our website.\n**2** - Then in the top right, click `Sign In With Discord`. If you see your username there instead, skip to the next step.\n**3** - Click your username in the top right then hit `Dashboard`.\n**4** - Find the guld you wish to redeem your bot with.\n**5** - Paste in the code that you got when purchasing the bot.\n**6** - That's it! Now just configure your bot. Please reach out to our support team if you need anything! :)",
          footer: {
            text: `Requested By: ${msg.author.tag}`
          }
        }})

       } else if (document === "order"){
        return msg.channel.send({embed: {
          title: "How To Order A Bot",
          color: "GREEN",
          description: "First off, thank you for showing interest in ordering a bot from our company, it means a lot!\n\n**PAYPAL PAYMENT:**\nPayPal is the recommend payment as we have a lot of differnet plans!\n\n**One Month Plan** - Our one month plan allows you to pay a montlhy fee of just $2! Click [here](https://sellix.io/product/5fe0cd14a923a) to get it.\n\n**6 Month Plan** - Our 6 month payment is awesome and save you some money! All you do is pay $9 and you get the bot for 6 months! That means you're saving $7! You can click [here](https://sellix.io/product/5fe4f246c8c71) to buy it.\n\n**12 Month Plan** - Our 12 month plan is the best plan we offer. All you need to do is pay $12 and you get a year with our bot! This means you're saving $12! You can click [here](https://sellix.io/product/5fe4f2bdb1539) to buy it.\n\n**ROBUX PAYMENT:**\nFor Robux payment, we only offer a monthly plan. For Robux payment, just join [this Roblox game](https://www.roblox.com/games/6111943301/Vortex-HQ-Product-Hub) to order!\n\nMore information can be found in <#775663449090162698>!",
                footer: {
            text: `Requested By: ${msg.author.tag}`
          }
        }})
      } else {
        return msg.channel.send({embed: {
          title: "Assist Cards",
          description: "`redeem` - How to redeem a code.\n`order` - How to order a bot.",
          color: "RED",
                footer: {
            text: `Requested By: ${msg.author.tag}`
          }
        }});
      }
        }
}

module.exports = AssistCommand;

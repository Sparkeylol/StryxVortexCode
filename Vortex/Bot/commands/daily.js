const talkedRecently = new Set();

const Daily = {
    name: "Daily",
    command: "daily",
    category: "Fun",
    description: "Every day, use this command to earn money!",
    usage: "daily",
    execute: async function (client, msg, args, embed, guildSettings) {
        if (talkedRecently.has(msg.author.id)) {
            embed.setTitle("Uh oh!")
            embed.setDescription("There is a 24 hour cooldown on this command.")
            embed.setColor("RED")
            msg.channel.send(embed)
    } else {
        const economy = require('../util/database.util').economy
    

        
        function generateMoney() {
            return Math.floor(Math.random() * (200 - 1 + 1) + 1);
        }
        let moneyToAdd = generateMoney()
        embed.setTitle("You found some money! :moneybag:")
        embed.setDescription(`You earned $${moneyToAdd}!`)
        msg.channel.send(embed)
        const author = msg.author

        const user = await economy.findOne({ user: msg.author.id, guild: msg.guild.id }) 
            if (!user || user === null) {
                let user = await economy.create({
                    user: msg.author.id,
                    guild: msg.guild.id,
                    cash: moneyToAdd,
                    bank: 0,
                    total: 0
                })
            } else {
                let updatedUser = await economy.findOneAndUpdate({ user: msg.author.id, guild: msg.guild.id }, {
                    cash: moneyToAdd + user.cash
                })
            }
          
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 86400000);
    }
                    
        }
    }

module.exports = Daily
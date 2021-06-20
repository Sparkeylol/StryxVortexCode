const talkedRecently = new Set();

const Work = {
    name: "Work",
    command: "work",
    category: "Fun",
    description: "Work to earn some money!",
    usage: "Work",
    execute: async function (client, msg, args, embed, guildSettings) {
        if (talkedRecently.has(msg.author.id)) {
            embed.setTitle("Uh oh!")
            embed.setDescription("There is a 60 second cooldown on this command.")
            embed.setColor("RED")
            msg.channel.send(embed)
    } else {
        const economy = require('../util/database.util').economy
        

        var reasonworking = [
            "You worked as a janitor for a day",
            "You begged people for money",
            "You started a TikTok",
            "You started a YouTube channel",
            "You became a famous e-sports player",
            "You win the lottery",
            "You become a famous developer",
            "You work at Discord",
            "You did your chores",
            "You worked as a construction worker",
            "You worked as a programmer",
            "You worked as a window cleaner",
            "You work as a support agent",
            "You work as a YouTube video editor",
            "You with Mr.Beast",
            "You became a Chick Fil A Worker",
            "You became a hacker"

        ]

        var reason = reasonworking[Math.floor(Math.random() * reasonworking.length)];
        function generateMoney() {
            return Math.floor(Math.random() * (400 - 1 + 1) + 1);
        }
        let moneyToAdd = generateMoney()
        embed.setTitle("You got a job!")
        embed.setDescription(`${reason} ` + "and earned ``"  + `$${moneyToAdd}` + "``")
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
        }, 60000);
    }
                    
        }
    }

module.exports = Work
const talkedRecently = new Set();

const Rob = {
    name: "Rob",
    command: "rob",
    category: "Fun",
    description: "Rob a user!",
    usage: "rob <@user>",
    execute: async function (client, msg, args, embed, guildSettings) {
        if(!args[0]){
            embed.setTitle( "Uh oh!")
            embed.setDescription("Please mention a user to rob!")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
        const economy = require('../util/database.util').economy
        const target = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first()
        const usert = await economy.findOne({ user: target.id, guild: msg.guild.id })
        const robberUser = await economy.findOne({ user: msg.author.id, guild: msg.guild.id })
        const author = msg.author.id
        if (talkedRecently.has(msg.author.id)) {
            embed.setTitle("Uh oh!")
            embed.setDescription("There is a 60 second cooldown on this command.")
            embed.setColor("RED")
            msg.channel.send(embed)
    } else {

        const usertorob = args[0]

        if(usertorob === `<@!${msg.author.id}>`){
            embed.setTitle("Uh oh!")
            embed.setDescription("How can you rob yourself...? :thinking:")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
       
        var reasonworking = [
            "yes",
            "no"

        ]
        var reason = reasonworking[Math.floor(Math.random() * reasonworking.length)];
        function generateMoney() {
            return Math.floor(Math.random() * (200 - 1 + 1) + 1);
        }
        function generateMoneyToLoose() {
            return Math.floor(Math.random() * (300 - 1 + 1) + 1);
        }
        let moneyToLoose = generateMoneyToLoose()
        if(reason === "yes"){
            embed.setTitle("Uh oh!")
            embed.setDescription(`You failed the robbery on ${target} and lost $${moneyToLoose}!`)
            embed.setColor("RED")
            let robber = await economy.findOneAndUpdate({ user: msg.author.id, guild: msg.guild.id }, {
                cash: robberUser.cash - moneyToLoose
            })
             msg.channel.send(embed)
             embed.setTitle("Woo!")
            embed.setDescription(`Whoops, <@${msg.author.id}> attempted to rob you, but they failed and lost $${moneyToLoose}!`)
            return target.send(embed).catch(() => {
                console.log("Cannot send them a DM.")
            })
        }

      
        function generateMoney(min, max) {
            min = Math.ceil(0);
            max = Math.floor(usert.cash);
            return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
          }
          if (usert.cash <= 0){
            embed.setTitle("Uh oh!")
            embed.setDescription("They had no money for you to take!")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
        let moneyToAdd = generateMoney()

        embed.setTitle("You robbed someone!")
        embed.setDescription(`You robbed ${target} and earned $${moneyToAdd}! Nice one!`)
        msg.channel.send(embed)
        embed.setTitle("Uh oh!")
        embed.setDescription(`Yikes, it looks like <@${msg.author.id}> robbed $${moneyToAdd} from you!`)
        target.send(embed).catch(() => {
            console.log("Cannot send them a DM.")
        })
            
       
            let updatedUser = await economy.findOneAndUpdate({ user: target.id, guild: msg.guild.id }, {
                cash: usert.cash - moneyToAdd
            })

            let robber = await economy.findOneAndUpdate({ user: msg.author.id, guild: msg.guild.id }, {
                cash: robberUser.cash + moneyToAdd
            })
    
                 
          
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 60000);
    }
                    
        }}
    

module.exports = Rob
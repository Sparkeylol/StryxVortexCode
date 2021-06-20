const Bal = {
    name: "Bal",
    command: "bal",
    category: "Fun",
    description: "Check your balance!",
    usage: "bal",
    execute: async function (client, msg, args, embed, guildSettings) {
        const economy = require('../util/database.util').economy
        const target = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first()
        if(target){
            const targetthing = await economy.findOne({ user: target.id, guild: msg.guild.id }) 
            embed.setTitle(`${target.user.username}'s Balance`)
            embed.addField("Cash", `$${targetthing.cash}`)
            embed.addField("Bank", `$${targetthing.bank}`)
            embed.addField("Total", `$${targetthing.bank + targetthing.cash}`)
            return msg.channel.send(embed)
        }

        const user = await economy.findOne({ user: msg.author.id, guild: msg.guild.id }) 

        if  (!user || user === null) {
            let user = await economy.create({
                user: msg.author.id,
                guild: msg.guild.id,
                cash: 0,
                bank: 0,
                total: 0
            })
            embed.setTitle("Your Balance")
            embed.addField("Cash", `$${user.cash}`)
            embed.addField("Bank", `$${user.bank}`)
            embed.addField("Total", `$${user.bank + user.cash}`)
            return msg.channel.send(embed)
        } else {
            embed.setTitle("Your Balance")
            embed.addField("Cash", `$${user.cash}`)
            embed.addField("Bank", `$${user.bank}`)
            embed.addField("Total", `$${user.bank + user.cash}`)
            msg.channel.send(embed)
        }

    }
}

module.exports = Bal
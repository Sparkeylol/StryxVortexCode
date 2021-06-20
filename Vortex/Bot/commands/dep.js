function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

const floor = (value, exp) => decimalAdjust('floor', value, exp);

const Dep = {
    name: "Deposit",
    command: "dep",
    category: "Fun",
    description: "Deposit cash to your bank!",
    usage: "dep <amount>",
    execute: async function (client, msg, args, embed, guildSettings) {
        const economy = require('../util/database.util').economy
        const user = await economy.findOne({ user: msg.author.id, guild: msg.guild.id }) 
        const amountInCash = user.cash
        if (amountInCash <= 0){
            embed.setTitle("Uh oh!")
            embed.setDescription("The bank declined the transaction as you have no money to deposit!")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
        if(args[0].toLowerCase() === "all"){
            embed.setTitle("Got it!")
            embed.setDescription(`The bank approved your transaction. You deposited $${user.cash} into the bank!`)
            msg.channel.send(embed)
            await economy.findOneAndUpdate({ user: msg.author.id }, {
                bank: user.bank + user.cash,
                cash: 0
            })
            return 
        }

        const depositAmount = parseInt(args[0])
        if(!depositAmount){
            embed.setTitle("Uh oh!")
            embed.setDescription("Please imput the amount you wish to deposit!")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }

        if (depositAmount <= 0) {
            embed.setTitle("Uh oh!")
            embed.setDescription("Please imput the amount you wish to deposit!")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
        
        if(isNaN(depositAmount)){
            embed.setTitle("Uh oh!")
            embed.setDescription("The bank doesn't understand the provided deposit amount!")
            embed.setColor("RED")
            return msg.channel.send(embed)
            }
        if (amountInCash < depositAmount){
            embed.setTitle("Uh oh!")
            embed.setDescription("The bank declined the transaction since you're attempting to deposit more money then you have in cash!")
            embed.setColor("RED")
            return msg.channel.send(embed)

        }
        
        let moneyToLoose = floor(Math.random(), -1) * 10
        embed.setTitle("Got it!")
        embed.setDescription(`The bank approved your transaction. You deposited $${depositAmount} into the bank!`)
        msg.channel.send(embed)

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
                cash: user.cash - depositAmount,
                bank: user.bank + depositAmount
            })
        }
        
            }
    }

module.exports = Dep
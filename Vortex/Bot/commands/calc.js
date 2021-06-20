const math = require('mathjs');

const Calc = {
    name: "Calc",
    command: "calc",
    category: "Utility",
    description: "Calculate an equation.",
    usage: "calc <equation>",
    execute: async function(client, msg, args, embed, guildSettings) {
        if (!args[0]) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription("Please provide a question for me to calculate!")
            return msg.channel.send(embed)
        }

        var resp
        
        try {
            resp = math.evaluate(args.join(' '))
        } catch (e) {
            embed.setTitle("Uh oh!")
            embed.setColor(15158332)
            embed.setDescription("I'm unable to provide an answer to that question, please try again!")
            return msg.channel.send(embed)
        }

        embed.setTitle("Calculator")
        embed.addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        embed.addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        msg.channel.send(embed)
    }
}

module.exports = Calc
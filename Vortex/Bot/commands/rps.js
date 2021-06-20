const RPS = {
    name: "Rock Paper Scissors",
    command: "rps",
    category: "Fun",
    description: "Play Rock Paper Scissors against the bot!",
    usage: "rps <rock/paper/scissors>",
    execute: async function (client, msg, args, embed, guildSettings) {
        var options = ["rock", "paper", "scissors"]
        if (!options.includes(args[0])) return msg.channel.send(embed.setTitle("Uh oh!").setDescription("Please pick `Rock`, `Paper`, or `Scissors`."))
        var res = options[Math.floor(Math.random() * options.length)]
        embed.addField("I picked", res)
        embed.addField("You picked", args[0])
        if (res === args[0]) {
            return msg.channel.send(embed.setTitle("It's a tie!"))
        }
        if (res === "rock" && args[0] === "paper") {
            return msg.channel.send(embed.setTitle("You win!"))
        }
        if (res === "rock" && args[0] === "scissors") {
            return msg.channel.send(embed.setTitle("I win!"))
        }
        if (res === "paper" && args[0] === "scissors") {
            return msg.channel.send(embed.setTitle("You win!"))
        }
        if (res === "paper" && args[0] === "rock") {
            return msg.channel.send(embed.setTitle("I win!"))
        }
        if (res === "scissors" && args[0] === "rock") {
            return msg.channel.send(embed.setTitle("You win!"))
        }
        if (res === "scissors" && args[0] === "paper") {
            return msg.channel.send(embed.setTitle("I win!"))
        }
    
    }
}

module.exports = RPS
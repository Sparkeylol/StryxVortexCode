const Emojify = {
    name: "Emojify",
    command: "emojify",
    category: "Utility",
    description: "Convert a sentence into emojis!",
    usage: "emojify <text>",
    execute: async function (client, msg, args, embed, guildSettings) {

        const emoji = require('discord-emoji-convert');

        if (!args) {
            embed.setTitle("Uh oh!")
            embed.setDescription(`You didn't specify text for me to emojify!`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        }


        const text = args.slice(0).join(" ")


        try {
            emoji.convert(text)
        } catch {
            embed.setTitle("Uh oh!")
            embed.setDescription("I was unable to get emojis for ``" + text + "``.")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }

        msg.channel.send(emoji.convert(text))
            .catch((err) => {
                console.log(err)
                embed.setTitle("Uh oh!")
                embed.setDescription("An unexpected error occurred, please ensure you didn't try to emojify an emoji, or enter a large amount of text.")
                embed.setColor("RED")
                return msg.channel.send(embed)
            })









    }
}
module.exports = Emojify
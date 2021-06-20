const { e } = require("mathjs");

const Eightball = {
    name: "Eightball",
    command: "eightball",
    category: "Fun",
    description: "Play eight ball with the system!",
    usage: "Eightball <question>",
    execute: async function(client, msg, args, embed, guildSettings) {

if(!args[0]) {
    embed.setTitle("Uh oh!")
    embed.setDescription("You need to specify a question!")
    embed.setColor("RED")
    return msg.channel.send(embed)
}
       
        
            function doMagic8BallVoodoo() {

            var rand = [
                "Of course!",
                "No!",
                "Yep!",
                "Yes!",
                "No!",
                "Nope!",
                "I'd say... yes!",
                "It's a no for me!"
            ];
            return rand[Math.floor(Math.random()*rand.length)];
        };
       
            embed.setTitle("8 Ball Says... 🎱")
            embed.setDescription(doMagic8BallVoodoo())
            msg.channel.send(embed)
        

    }}
    module.exports = Eightball
const { e } = require("mathjs");

const Eightball = {
    name: "Eightball",
    command: "eightball",
    category: "Utility",
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
                "It is certain!",
                "It is decidedly so!",
                "Without a doubt!",
                "Definitely!",
                "I'm unsure!",
                "I think!",
                "Most Likely!",
                "Outlook good!",
                "Yes!",
                "Signs point to yes!",
                "Sadly no!"
            ];
            return rand[Math.floor(Math.random()*rand.length)];
        };
       
            embed.setTitle("8 Ball Says...")
            embed.setDescription(doMagic8BallVoodoo())
            embed.setColor("YELLOW")
            msg.channel.send(embed)
        

    }}
    module.exports = Eightball
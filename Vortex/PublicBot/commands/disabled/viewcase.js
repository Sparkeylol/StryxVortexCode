const Viewcase = {
    name: "Viewcase",
    command: "viewcase",
    category: "Moderation",
    description: "View a case.",
    usage: "viewcase <case id>",
    execute: async function(client, msg, args, embed, guildSettings) {


if(!args[0]){
    embed.setTitle("Uh oh!")
    embed.setDescription("Please specify a case ID.")
    embed.setColor("RED")
    return msg.channel.send(embed)
}







    }}
    module.exports = Viewcase
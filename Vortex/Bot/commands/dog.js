const Dog = {
    name: "Dog",
    command: "dog",
    category: "Fun",
    description: "Get a dog picture!",
    usage: "dog",
    execute: function (client, msg, args, embed, guildSettings) {

const got = require('got');
const Discord = require('discord.js')
    
    got('https://www.reddit.com/r/dogpictures/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`)
        embed.setURL(`${memeUrl}`)
        embed.setImage(memeImage)
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
        msg.channel.send(embed);
    })
    }}
    module.exports = Dog
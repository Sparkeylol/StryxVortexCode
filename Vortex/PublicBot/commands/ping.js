const Ping = {
    name: "Ping",
    command: "ping",
    category: "Utility",
    description: "Displays API and Bot Latency",
    usage: "ping",
    execute: async function(client, msg, args, embed) {
        embed.setTitle("**Fetching Ping...**")
        msg.channel.send(embed).then(m => {
            embed.setTitle("**Pong!**")
            embed.addField("API Latency:", `${m.createdTimestamp - msg.createdTimestamp} ms`)
            embed.addField("Bot Latency", `${Math.round(client.ws.ping)} ms`)
            m.edit(embed)
        })
    }
}

module.exports = Ping
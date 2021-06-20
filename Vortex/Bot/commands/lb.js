  
const Leaderboard = {
    name: "Leaderboard",
    command: "lb",
    category: "Fun",
    description: "See the richest people!",
    usage: "lb",
    execute: async function (client, msg, args, embed, guildSettings) {
            const economy = require('../util/database.util').economy

            const filtered = await economy.find({ guild: msg.guild.id })


            // Sort it to get the top results... well... at the top. Y'know.
            const sorted = filtered.sort((a, b) => (b.cash + b.bank) - (a.cash + a.bank));

            // Slice it, dice it, get the top 10 of it!
            const top10 = sorted.splice(0, 10);

            // Now shake it and show it! (as a nice embed, too!)
                embed.setTitle("Leaderboard")
                embed.setDescription(`Top 10 wealthiest people in ${msg.guild.name}!`)
            for(const data of top10) {
                try {
                username = client.users.cache.get(data.user).tag
                } catch (e) {
                username = "Unknown."
                }
                embed.addField(username, `Cash: $${data.cash}\nBank: $${data.bank}\nTotal: $${data.cash + data.bank}`);
            }
            msg.channel.send({embed});
        }
    }

module.exports = Leaderboard
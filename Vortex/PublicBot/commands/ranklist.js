const Ranklist = {
	name: "Ranklist",
	command: "ranklist",
	category: "Utility",
	description: "View the Roblox group rank list.",
	usage: "ranklist",
	execute: async function(client, msg, args, embed, guildSettings) {
        if (!guildSettings.roblox.verification.updaterole || !guildSettings.roblox.cookie){
            embed.setTitle("Uh oh!")
            embed.setDescription(`A server administrator needs to configure this command. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/roblox).`)
            embed.setColor("RED")
            return msg.channel.send(embed)
        } else {
            if (!msg.member.roles.cache.has(`${guildSettings.roblox.verification.updaterole}`)) {
                embed.setTitle("Uh oh!")
                embed.setColor(15158332)
                embed.setDescription(`You must have the <@&${guildSettings.roblox.verification.updaterole}> role to use this command!`)
                return msg.channel.send(embed)
            }
        const roblox = require("noblox.js");
        const getRoles = await roblox.getRoles(guildSettings.roblox.groupid)
        const formattedRoles = getRoles.map((r) => `\`${r.name}\` - ${r.rank} **(${r.memberCount})**`);
        embed.setTitle('Rank Information:')
        embed.setColor("GREEN")
        embed.setDescription(formattedRoles)
        msg.channel.send(embed)
    }
}
}
module.exports = Ranklist
const { e } = require('mathjs');

const Purge = {
	name: "Purge",
	command: "purge",
	category: "Moderation",
	description: "Purge messages in a channel.",
	usage: "purge <amount>",
	execute: async function(client, msg, args, embed, guildSettings) {

		
const Discord = require('discord.js');
var logchannel = client.channels.cache.get(`${guildSettings.logchannelid}`)
let person = msg.author
const { member } = msg;


if (!guildSettings.modroleid || !guildSettings.logchannelid){
	embed.setTitle("Uh oh!")
	embed.setDescription(`A server administrator needs to set the Moderator Role ID and/or the Log Channel ID. This can be done [here](https://vortexhq.net/servers/${msg.guild.id}/utility).`)
	embed.setColor("RED")
	msg.channel.send(embed)
} else {    

if (!msg.member.roles.cache.has(`${guildSettings.modroleid}`)) {
	embed.setTitle("Uh oh!")
	embed.setColor(15158332)
	embed.setDescription(`You must have the <@&${guildSettings.modroleid}> role to use this command!`)
	return msg.channel.send(embed)
}
		const invalidnumber = new Discord.MessageEmbed()

			const amount = parseInt(args[0]) + 1;
			if (isNaN(amount)) {
				msg.channel.bulkDelete(1);
				return msg.channel.send(invalidnumber)
					.then(msg => {
						msg.delete({ timeout: 5000 });
					})
					.catch(console.error);
			}
			else if (amount <= 1 || amount >= 52) {
				msg.channel.bulkDelete(1);
				const limit = new Discord.MessageEmbed()
					.setColor('FF0000')
					.setTitle('Limit Exceeded!')
          			.setFooter(`Powered by ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`)
					.setDescription(`${msg.author}, the maxium purge limit is 50 messages.`);
				return msg.channel.send(limit)
					.then(msg => {
						msg.delete({ timeout: 5000 });
					})
					.catch(console.error);
			}
			msg.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				msg.channel.bulkDelete(1);
				const error = new Discord.MessageEmbed()
					.setColor('FF0000')
					.setTitle('Error!')
					.setDescription(`There was an error trying to purge messages in this channel ${msg.author}!.\n\n**Debugging:**\n||${err.msg}||`);
				msg.channel.send(error);
			});
			const doneEmbed = new Discord.MessageEmbed()
			.setColor('00FF00')
			.setTitle('Purged Successfully!')
			.setDescription(`**${msg.author}**, Purged ${amount - 1} Messages`);
			msg.channel.send(doneEmbed)
				.then(msg => {
					msg.delete({ timeout: 5000 });

					  embed.setTitle("Messages Purged")
					  embed.setDescription(`${person} has purged ${amount - 1 } message(s) in ${msg.channel}`)
					  embed.setColor("RED")
					logchannel.send(embed)
				})

					
					  
					


				
				
		}}
	}

			module.exports = Purge
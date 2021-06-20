const fs = require('fs')
const Discord = require('discord.js')
const db = require('./util/database.util')
const figlet = require('figlet')

if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
}

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.command, command);
}

client.login('NzgyMTI0MDQxMzM4MzU1NzQy.X8Hnxg.-3895U3XDMuRkiuXW_b9lntbYOI')

client.on('ready', async () => {
    let statuses = [
        {
            type: "WATCHING",
            text: "for .help"
        }
    ]
    function changeStatus(){
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status.text, { type: status.type })    
    }
    changeStatus()
    setInterval(changeStatus, 120000)
    console.log(figlet.textSync('Vortex HQ Public', { horizontalLayout: "full" }));
    console.log(`> Bot Started`)
    console.log(`> Channels: ${client.channels.cache.size}`)
    console.log(`> Users: ${client.users.cache.size}`)
})

client.on('message', async msg => {
    let guildSettings = await db.publicBotSettings.findOne({ guildid: msg.guild.id })

	if (!msg.content.startsWith(guildSettings.prefix) || msg.author.bot) return;

	const args = msg.content.slice(guildSettings.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    const embed = new Discord.MessageEmbed()

    embed.setFooter("Powered by Vortex HQ", client.user.avatarURL())

    embed.setColor("#ffffff")

    embed.setAuthor(msg.author.username, msg.author.avatarURL())

    embed.setTimestamp()

    if (client.commands.has(command.toLowerCase())) {
        let cmd = client.commands.get(command.toLowerCase())
        if (cmd.role) {
            if (!msg.member.roles.cache.has(cmd.role)) {
                embed.setTitle("You aren't allowed to use this command.")
                embed.setDescription(`Role Needed: <@&${cmd.role}>`)
                return msg.channel.send(embed)
            }
        }
        cmd.execute(client, msg, args, embed, guildSettings)
    } else {
        embed.setTitle("Command not found. Say `"+guildSettings.prefix+"help` to view the command list.")
        msg.channel.send(embed)
    }
});

client.on('guildCreate', guild => {
    db.publicBotSettings.create({
        guildid: guild.id,
        prefix: ".",
        modules: {
            logging: {
                channel: "",
                events: [],
                enabled: false
            },
            moderation: {
                role: "",
                moderate: [],
                enabled: false
            },
            ticketing: {
                category: "",
                enabled: false 
            },
            support: {
                role: "",
                enabled: false
            },
        },
        commandsEnabled: [
            'ban', 'kick', 'mute', 'purge', 'slowmode', 'unmute', 'new', 'close', 
            'dm', 'dcount', 'eightball', 'calc', 'embed', 'ping', 'say', 'serverinfo', 'suggest', 
            'uptime', 'weather'
        ]
    })
})

client.on('guildMemberAdd', member => {
    if (!guildSettings.welcomechannel) return
    let channel = member.guild.channels.cache.get(guildSettings.welcomechannel)
    let embed = new Discord.MessageEmbed
    embed.setTitle(`${guildSettings.welcometitle}`.format(`<@${member.id}>`, member.displayName))
    embed.setDescription(`${guildSettings.welcometext}`.format(`<@${member.id}>`, member.displayName))
    embed.setColor(guildSettings.welcomecolor)
    embed.setFooter((guildSettings.branding ? "Powered by Vortex HQ" : client.user.username), client.user.avatarURL())
    embed.setAuthor(member.displayName, member.user.avatarURL() || member.user.displayAvatarURL())
    embed.setTimestamp(new Date())
    channel.send(embed)
})

client.on('messageDelete', msg => {
    if (msg.author.bot) return
    if (msg.mentions.members.first() && !msg.mentions.members.first().user.bot && msg.mentions.members.first().user.id !== msg.author.id) {

        let embed = new Discord.MessageEmbed()
        .setTitle('Ghost Ping Detected!')
        .setColor('ffffff')
        .setFooter(`Moderation | Powered By ${(guildSettings.branding ? "Vortex HQ" : client.user.username)}`)
        .addField('Sender', msg.author)
        .addField('Message', msg.content);

        msg.channel.send(embed)
    }
})
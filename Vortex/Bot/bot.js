const fs = require('fs')
const Discord = require('discord.js')
const figlet = require('figlet');
const db = require('./util/database.util')
const noblox = require("noblox.js")

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var guildSettings
db.guild.findOne({ guildid: process.env.GUILD_ID }).then(doc => {
    if (doc === null) {
        console.log(figlet.textSync('ERROR', { horizontalLayout: "full" }))
        console.log("GUILD_ID is not set.")
        return process.exit(1)
    }
    guildSettings = doc
    client.login(guildSettings.bottoken)
})

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.verification = []

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.command, command);
}

client.on('ready', async () => {
    guildSettings = await db.guild.findOne({ guildid: process.env.GUILD_ID })
    if (guildSettings.statuses.length > 0) {
        if (guildSettings.branding) {
            guildSettings.statuses.push({ type: "PLAYING", text: "Powered by Stryx.cloud" })
        }
        function changeStatus() {
            let status = guildSettings.statuses[Math.floor(Math.random() * guildSettings.statuses.length)]
            client.user.setActivity(status.text, { type: status.type })
        }
        changeStatus()
        setInterval(changeStatus, 120000)
    }
    console.log(figlet.textSync('Stryx.cloud', { horizontalLayout: "full" }));
    console.log(`> Bot Started`)
    console.log(`> Channels: ${client.channels.cache.size}`)
    console.log(`> Users: ${client.users.cache.size}`)
    try {
        await noblox.setCookie(guildSettings.roblox.cookie)
        noblox.onAuditLog(guildSettings.roblox.groupid).on("shout", function (data) {
            console.log("New action!", data)
        })
    } catch (err) {
        console.log(err)
    }
})

client.on('message', async msg => {
    guildSettings = await db.guild.findOne({ guildid: process.env.GUILD_ID })

    if (!msg.content.startsWith(guildSettings.prefix) || msg.author.bot) return;

    if (msg.channel.type !== "dm" && msg.guild.id !== guildSettings.guildid) {
        embed.setTitle("Uh oh!")
        embed.setDescription("Hey there!\nThis bot is linked to another guild already. You can purchase a plan via our [website](https://vortexhq.net). If you think this is an error, please reach out to us via our support chat on our [website](https://vortexhq.net) or [Discord Support Server](https://discord.gg/cbRSPFc6TV).")
        embed.setColor("RED")
        msg.guild.owner.send(embed)
        msg.guild.leave()
    }

    const args = msg.content.slice(guildSettings.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const embed = new Discord.MessageEmbed()

    embed.setFooter((guildSettings.branding ? "Powered by Stryx.cloud" : client.user.username), client.user.avatarURL())

    embed.setColor(msg.guild.me.displayColor)

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
        console.log("Command not found.")
    }
});



client.on('guildMemberAdd', member => {
    if (!guildSettings.welcomechannel) return
    let channel = member.guild.channels.cache.get(guildSettings.welcomechannel)
    let embed = new Discord.MessageEmbed
    embed.setTitle(`${guildSettings.welcometitle}`.format(`<@${member.id}>`, member.displayName, member.guild.name, member.guild.memberCount))
    embed.setDescription(`${guildSettings.welcometext}`.format(`<@${member.id}>`, member.displayName, member.guild.name, member.guild.memberCount))
    embed.setColor(guildSettings.welcomecolor)
    embed.setFooter((guildSettings.branding ? "Powered by Stryx.cloud" : client.user.username), client.user.avatarURL())
    embed.setAuthor(member.displayName, member.user.avatarURL() || member.user.displayAvatarURL())
    embed.setTimestamp(new Date())
    channel.send(embed)
})

client.on('messageDelete', msg => {
    if (msg.author.bot) return
    if (msg.mentions.members.first() && !msg.mentions.members.first().user.bot && msg.mentions.members.first().user.id !== msg.author.id) {

        let embed = new Discord.MessageEmbed()
            .setTitle('Ghost Ping Detected!')
            .setColor('RED')
            .setFooter(`Moderation | Powered By ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`)
            .addField('Sender', msg.author)
            .addField('Message', msg.content);

        msg.channel.send(embed)
    }
})
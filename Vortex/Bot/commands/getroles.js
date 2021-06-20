const linked = require('../util/database.util').linked

const noblox = require('noblox.js')

var randomWords = require('random-words');

const GetRoles = {
    name: "GetRoles",
    command: "getroles",
    category: "Roblox",
    description: "Sync group roles to Discord roles",
    usage: "getroles",
    execute: async function (client, msg, args, embed, guildSettings) {



        const linked = require('../util/database.util').linked
        const noblox = require("noblox.js")
       
      
            const e = await linked.findOne({ discordId: msg.author.id })
            if(e === null){
                embed.setTitle("Uh oh!")
            embed.setDescription("You're not yet verified yet! Please use the ``" + guildSettings.prefix + "verify`` command to verify!")
            return msg.channel.send(embed)
            }  
       


            let ufr = await noblox.getUsernameFromId(e.robloxId)
            embed.setDescription(`Hey there, ${ufr}! Welcome to ${msg.guild.name}! I've updated your roles! `+ "\n\nTo verify as another account, say ``" + guildSettings.prefix + "reverify``.")
            let groupRole = await noblox.getRankNameInGroup(guildSettings.roblox.groupid, e.robloxId)
            

            let discordRole = msg.guild.roles.cache.find(role => role.name === groupRole)

            let removeRole = msg.guild.roles.cache.find(role => role.name === e.previousRole)
            

            if (!discordRole) {
                discordRole = await msg.guild.roles.create({
                    data: {
                        name: groupRole
                    }
                })
            }
            try {
                msg.member.roles.add(verifiedRole)
            } catch {
                console.log(`${msg.author.id} already has the verified role.`)
            }
            
            msg.member.roles.remove(removeRole)

            msg.member.roles.add(discordRole)
            
            
            embed.addField("Roles Added", groupRole, true)
            if (groupRole !== e.previousRole) {
                msg.member.roles.remove(removeRole)
                await linked.findOneAndUpdate({ discordId: msg.author.id }, { previousRole: groupRole })
                embed.addField("Roles Removed", (e.previousRole === "" || e.previousRole === groupRole ? "None": e.previousRole ), true)
            }
            const usersid = msg.author.id
            const theirusername = await noblox.getUsernameFromId(e.robloxId)
            msg.guild.members.cache.get(usersid).setNickname(theirusername).catch(() => {
                const Discord = require('discord.js');
                const embedforerr = new Discord.MessageEmbed()
                .setTitle("Uh oh!")
                .setDescription("I was unable to change your nickname. This is either due to me not having permissions or you being the server owner!")
                .setColor("RED")
                .setFooter((guildSettings.branding ? "Powered by Stryx.cloud" : client.user.username), client.user.avatarURL())            
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTimestamp()
                return msg.channel.send(embedforerr)
            }) 
            
            await linked.findOneAndUpdate({ discordId: msg.author.id }, { previousRole: groupRole })
        
            return msg.channel.send(embed)
               

    }
}

module.exports = GetRoles
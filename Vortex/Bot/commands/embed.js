const { MessageEmbed } = require("discord.js");

const Embed = {
    name: "Embed",
    command: "embed",
    category: "Utility",
    description: "Create an Embed message",
    usage: "embed",
    execute: async function(client, msg, args, embed, guildSettings) {
        let channel = msg.channel
        
        if (msg.member.hasPermission('MANAGE_MESSAGES')) {
          msg.delete()
          msg.channel.send(`<@${msg.author.id}>, 👀🗒️ **Please check your DMs to continue with the prompt! This message will be deleted in 10 seconds. If you didn't get a DM, make sure your privacy settings allow server members to DM you!**`).then(msg => {
            msg.delete({ timeout: 10000 /*time unitl delete in milliseconds*/ });
          })
        
          embed.setTitle("Please specify a title for your embed")
          embed.setTimestamp()
          
          var sendEmbed = {}

          msg.author.send(embed).then((m) => {
            m.channel.createMessageCollector(t => t.author.id === msg.author.id, {max:1})
                .on('collect', async title => {
                    sendEmbed.title = title.content
    
                    embed.setTitle("Please specify a description for your embed!")
                    embed.setTimestamp()
                    msg.author.send(embed).then((m) => {
                    const c = m.channel.createMessageCollector(t => t.author.id === msg.author.id, {max: 1})
                    c.on('collect', async descResp => {
                        sendEmbed.description = descResp.content
    
                        embed.setTitle("Please specify a footer for your embed!")
                        embed.setTimestamp()
                        msg.author.send(embed).then((m) => {
                            m.channel.createMessageCollector(t => t.author.id === msg.author.id, {max: 1})
                                .on('collect', footer => {
                                    sendEmbed.footer = footer.content
                                    embed.setTitle("Please specify a color for your embed!")
                                    embed.setDescription("You can only enter a basic color. Please ensure to type it in all caps.\nExample: `GREEN`. Something like `LIGHT GREEN` may not work. If you embed doesn't send, please redo the command and pick a new color.")
                                    msg.author.send(embed).then((m) => {
                                        m.channel.createMessageCollector(t => t.author.id === msg.author.id, {max: 1})
                                            .on('collect', color => {
                                                sendEmbed.color = color.content
    
                                                embed.setTitle(sendEmbed.title)
                                                embed.setDescription(sendEmbed.description)
                                                embed.setColor(sendEmbed.color)
                                                embed.setFooter(`${sendEmbed.footer} | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`)
    
                                                channel.send(embed)
    
                                                embed.setTitle("Embed Posted!")
                                                embed.setDescription(`Your embed has been posted in ${channel}!`)
                                                embed.setTimestamp()
                                                embed.setFooter(`Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`)
    
                                                msg.author.send(embed)
                                            })
                                    })
                                })
                        })
                    })
                })
            })        
  
          })
        } else {
            embed.setTitle("Uh oh!")
            embed.setDescription("You do not have permission to use this command! Missing permission: `MANAGE_MESSAGES`.")
            embed.setColor("RED")
            msg.reply(embed)
        }
    }
  }
  
  module.exports = Embed
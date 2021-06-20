
const Slowmode = {
  name: "Slowmode",
  command: "slowmode",
  category: "Moderation",
  description: "Set a channel's slowmode.",
  usage: "slowmode <time>",
  execute: async function(client, msg, args, embed, guildSettings) {
        const amount = parseInt(args[0])

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
    

     if(args[0] === "off") {
      msg.channel.setRateLimitPerUser(amount * 0 * 0)
      msg.channel.send({embed: {
        color: msg.guild.me.displayColor,
        title: "Got it!",
        description: "This channels slowmode is now off.",
        timestamp: new Date(),
        footer: {
          text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
       }
      }})

    }
    else {
        if(isNaN(amount)) return msg.channel.send({embed: {
          color: 15158332,
          title: "Uh oh!",
          description: "Please enter a time for the slowmode. You can set seconds(s), minutes(m) and hours(h).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        if(args[0] === amount + "s") {
        msg.channel.setRateLimitPerUser(amount)
        if(amount > 1) {
        msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " second(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return
        }
        else {msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " second(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return }
    } if(args[0] === amount + "m") {
        msg.channel.setRateLimitPerUser(amount * 60 * 1)
        if(amount > 1) {
        msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " minute(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return
        } else { 
            msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " minute(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})  
             
    
    return 
  }
    } if(args[0] === amount + "h") {
        msg.channel.setRateLimitPerUser(amount * 60 * 60)
        if(amount > 1) {
        msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " hour(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return
        } else {
            msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " hour(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return
      }
      } if(args[0] === amount + "h") {
        msg.channel.setRateLimitPerUser(amount * 60 * 60)
        if(amount > 1) {
        msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " hour(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return
        } else {
            msg.channel.send({embed: {
          color: msg.guild.me.displayColor,
          title: "Got it!",
          description: "This channels slowmode is now " + amount + " hour(s).",
          timestamp: new Date(),
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
        return
      }
 } else {
        msg.channel.send({embed: {
          color: 15158332,
          title: "Uh oh!",
          description: "You can only set seconds(s), minutes(m) and hours(h).",
          timestamp: new Date(),  
          footer: {
            text: `Moderation | Powered by ${(guildSettings.branding ? "Stryx.cloud" : client.user.username)}`
          }
        }})
    
    }
      
}
}
}}
module.exports = Slowmode

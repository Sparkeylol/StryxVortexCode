const Weather = {
    name: "Weather",
    command: "weather",
    category: "Utility",
    description: "Get the weather of a location.",
    usage: "weather <location>",
    execute: async function(client, msg, args, embed, guildSettings) {

     
        const weather = require('weather-js');

        const Discord = require('discord.js');

        
     
        
            weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
                // 'C' can be changed to 'F' for farneheit results
                if(!args[0]){
                    embed.setTitle("Uh oh!")
                    embed.setDescription("Please specify a location!")
                    embed.setColor("RED")
                    return msg.channel.send(embed)

                } 
        
                if(result === undefined || result.length === 0){

                    embed.setTitle("Uh oh!")
                    embed.setDescription("I was unable to find the weather for the location you provided.")
                    embed.setColor("RED")
                    return msg.channel.send(embed)
                }
        
                var current = result[0].current;
                var location = result[0].location;
        
                const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**Overall: ${current.skytext}.**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x111111)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', 'Fahrenheit', true)
                .addField('Temperature', `${current.temperature}°`, true)
                .addField('Wind', current.winddisplay, true)
                .addField('Feels like', `${current.feelslike}°`, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .setColor("GREEN")
        
                msg.channel.send(weatherinfo)
                })        
            }
        }
    
module.exports = Weather
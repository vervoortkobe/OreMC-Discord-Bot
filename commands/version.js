//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

          let {data} = await fetch;
    
          fetch("https://mcapi.xdefcon.com/server/185.8.177.10:26596/full/json")
          .then(res => res.json()).then(data => {
            if(!data) {
              return console.log("ERROR WHILE FETCHING MCSERVER INFO");
          }
      
            if(data.serverStatus === "online") {
              const onlineIpEmbed = new Discord.MessageEmbed()
              .setColor(0x003cff)
              .setTitle(`${client.user.username} • Ip`)
              .setThumbnail("https://cdn.discordapp.com/attachments/585899564553338945/713686525186932806/Logopng.png")
              .setDescription(`\`\`\`play.oremc.nl\`\`\``)
              .addField(`Server Status`, `\`\`\`🟢 Online\`\`\``)
              .addField(`Server Version`, `\`\`\`js\n[1.8.x-1.15.x]\`\`\``)
              .addField(`Online Players`, `\`\`\`js\n${data.players}/${data.maxplayers}\`\`\``)
              .setFooter(`${client.user.username} • Ip`)
              .setTimestamp()
              message.channel.send(onlineIpEmbed);
            }
            
            if(data.serverStatus === "offline") {
                const offlineIpEmbed = new Discord.MessageEmbed()
                .setColor(0x003cff)
                .setTitle(`${client.user.username} • Ip`)
                .setThumbnail("https://cdn.discordapp.com/attachments/585899564553338945/713686525186932806/Logopng.png")
                .setDescription(`\`\`\`play.oremc.nl\`\`\``)
                .addField(`Server Status`, `\`\`\`🔴 Offline\`\`\``)
                .setFooter(`${client.user.username} • Ip`)
                .setTimestamp()
                message.channel.send(offlineIpEmbed);
            }
          });
        }

  module.exports.help = {
    name: "version"
}
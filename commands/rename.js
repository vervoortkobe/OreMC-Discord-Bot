//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    let ticketsupport = message.guild.roles.find(r => r.id === "711596459480449074");
    if(!ticketsupport) return console.log("NO OREMC SUPPORT ROLE FOUND");
    if(!message.member.roles.has("711596459480449074")) return message.channel.send(":x: | You can't use this command, because you don't have the **OreMC Support** role!")
    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`:x: | You can use this command in tickets only!`);
    if(!args[0]) return message.channel.send(`:x: | You forgot to give a new name for this ticket!`);

    message.channel.setName(`ticket-${args[0]}`);

    message.channel.send(`:ballot_box_with_check: | This ticket was renamed to **#ticket-${args[0]}**!`);

    let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
    if (!ticketowners[message.channel.id]) {
        return;
    }
    let ticketowner = ticketowners[message.channel.id].ticketowners;
    
    let tickowner = message.guild.members.find(m => m.id === ticketowner);
    if(tickowner) {

      let logChannel = message.guild.channels.find(c => c.id === "711888583618854922");
      if(!logChannel) return;
          
      const logEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Ticket Renamed")
      .setDescription(`**${message.author} renamed the ticket of ${tickowner} to #ticket-${args[0]}**!`)
      .setFooter("Ticket Renamed")
      .setTimestamp()
      logChannel.send(logEmbed);

    } else {

      let logChannel = message.guild.channels.find(c => c.id === "711888583618854922");
      if(!logChannel) return;
          
      const logEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Ticket Renamed")
      .setDescription(`**${message.author} renamed** a ticket **to #ticket-${args[0]}**!`)
      .setFooter("Ticket Renamed")
      .setTimestamp()
      logChannel.send(logEmbed);
    }
  }

  module.exports.help = {
    name: "rename"
}
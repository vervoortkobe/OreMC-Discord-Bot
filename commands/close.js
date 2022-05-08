//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`:x: | You can use this command in tickets only!`);
    let reason = args.join(" ");
    if(!reason) reason = "no reason given";

    message.channel.send(":ballot_box_with_check: | This ticket will be closed in 10 seconds!");

    setTimeout(() => {
      let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
      if (!ticketowners[message.channel.id]) {
          return;
      }
      let ticketowner = ticketowners[message.channel.id].ticketowners;
      
      let tickowner = message.guild.members.find(m => m.id === ticketowner);
      if(tickowner) {

        const dmticketownerEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Ticket Closed")
        .setDescription(`:ballot_box_with_check: | <@${ticketowner}>, we have marked your ticket as **complete**!`)
        .addField("Reason", reason)
        .setFooter("Ticket Closed")
        .setTimestamp()
        tickowner.send(dmticketownerEmbed);

        let logChannel = message.guild.channels.cache.find(c => c.id === "711888583618854922");
        if(!logChannel) return;
      
        const logEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Ticket Closed")
        .setDescription(`**${message.author} closed** the ticket **#${message.channel.name}** of **<@${ticketowner}>**, because of **${reason}**!`)
        .setFooter("Ticket Closed")
        .setTimestamp()
        logChannel.send(logEmbed);

      } else {

        let logChannel = message.guild.channels.cache.find(c => c.id === "711888583618854922");
        if(!logChannel) return;
      
        const logEmbed = new Discord.RichEmbed()
        .setColor(0x003cff)
        .setTitle("Ticket Closed")
        .setDescription(`**${message.author} closed** ticket **#${message.channel.name}**, because of **${reason}**!`)
        .setFooter("Ticket Closed")
        .setTimestamp()
        logChannel.send(logEmbed);
      }
      message.channel.delete();
    }, 1000 * 10);
  }

  module.exports.help = {
    name: "close"
}
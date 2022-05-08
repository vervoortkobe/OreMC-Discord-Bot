//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(":x: | You can't use this command in tickets!");

    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    if(!member) {
      const addUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Add")
      .setDescription(`Usage: **${prefix}add <@member/member ID>**`)
      .setFooter("Add")
      .setTimestamp()
      return message.channel.send(addUsageEmbed);
    }
    if(member.id === message.author.id) return message.channel.send(":x: | You can't add yourself!");
  
    message.channel.overwritePermissions(member, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true,
      READ_MESSAGE_HISTORY: true,
      ATTACH_FILES: true
    });

    message.delete();
    message.channel.send(`:ballot_box_with_check: | ${message.author}, I added **${member} to this ticket (${message.channel})**!`)
  
    let logChannel = message.guild.channels.cache.find(c => c.id === "711888583618854922");
    if(!logChannel) return;
    
    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("User Added")
    .setDescription(`**${message.author} added ${member} to ${message.channel}**!`)
    .setFooter("User Added")
    .setTimestamp()
    logChannel.send(logEmbed);
  }

  module.exports.help = {
    name: "add"
}
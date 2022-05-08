//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(":x: | You can use this command in tickets only!");

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
    if(!member) {
      const removeUsageEmbed = new Discord.RichEmbed()
      .setColor(0x003cff)
      .setTitle("Remove")
      .setDescription(`Usage: **${prefix}remove <@member/member ID>**`)
      .setFooter("Remove")
      .setTimestamp()
      return message.channel.send(removeUsageEmbed);
    }
  
    message.channel.overwritePermissions(member, {
      SEND_MESSAGES: false,
      READ_MESSAGES: false,
      READ_MESSAGE_HISTORY: false,
      ATTACH_FILES: false
    });

    message.delete();
    message.channel.send(`:ballot_box_with_check: | ${message.author}, **I removed ${member}** from this ticket (${message.channel})!`)
  
    let logChannel = message.guild.channels.find(c => c.id === "711888583618854922");
    if(!logChannel) return;
    
    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("User Removed")
    .setDescription(`**${message.author} removed ${member} from ${message.channel}**!`)
    .setFooter("User Removed")
    .setTimestamp()
    logChannel.send(logEmbed);
  }

  module.exports.help = {
    name: "remove"
  }
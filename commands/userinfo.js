//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
    
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    };
    
    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
    if(!member) {
      const userinfoEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Userinfo")
      .setThumbnail(message.author.displayAvatarURL)
      .addField(`User`, message.author)
      .addField("Registered on", message.author.createdAt)
      .addField("How long ago", checkDays(message.author.createdAt))
      .addField("Joined on", message.author.joinedAt)
      .addField("How long ago", checkDays(message.guild.members.find(m => m.id === message.author.id).joinedAt))
      .addField("User's ID", message.author.id)
      .setFooter("Userinfo")
      .setTimestamp()
      message.channel.send(userinfoEmbed);
      
    } else {
    
      const userinfoEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Userinfo")
      .setThumbnail(member.user.displayAvatarURL)
      .addField(`User`, member)
      .addField("Registered on", member.user.createdAt)
      .addField("How long ago", checkDays(member.user.createdAt))
      .addField("Joined on", message.guild.members.find(m => m.id === member.id).joinedAt)
      .addField("How long ago", checkDays(message.guild.members.find(m => m.id === member.id).joinedAt))
      .addField("User's ID", member.id)
      .setFooter("Userinfo")
      .setTimestamp()
      message.channel.send(userinfoEmbed);
    }
  }

  module.exports.help = {
    name: "userinfo"
}
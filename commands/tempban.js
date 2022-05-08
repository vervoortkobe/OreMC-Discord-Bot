//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: | I couldn't tempban this user, because you don't have the BAN_MEMBERS perms!`);

    let tempbanTime = args[1];
    let timeDuration = args[2];

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);

    if(!member || !isNaN(tempbanTime) || !tempbanTime || !timeDuration) {
      const tempbanUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle(`Tempban`)
      .setDescription(`Usage: **${prefix}tempban <user> <time> <m/h/d> <reason>**`)
      .setFooter(`Tempban`)
      return message.channel.send(tempbanUsageEmbed);
    }
    
    if(member.id === message.author.id) return message.channel.send(`:x: | You can't tempban yourself!`);
    if(!member.bannable) return message.channel.send(`:x: | I couldn't tempban this user! Does he/she have a higher role? Do I have ADMINISTRATOR perms?`);

    if(timeDuration === `m`) {
      tempbanTime = (args[1])*60;
    }
    if(timeDuration === `h`) {
      tempbanTime = (args[1])*3600
    }
    if(timeDuration === `d`) {
      tempbanTime = (args[1])*86400;
    }

    
    if(!timeDuration === `m` || !timeDuration === `h` || !timeDuration === `d`) return message.channel.send(tempbanUsageEmbed);
    
    let reason = args.slice(3).join(' ');
    if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    const tempbanPmEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Tempbanned`)
    .setDescription(`You're tempbanned from ${message.guild.name}, for ${args[1]}${args[2]}, because of ${reason}!`)
    .addField(`Server`, message.guild.name)
    .addField(`Duration`, `${args[1]}${args[2]}`)
    .addField(`Reason`, reason)
    .setFooter(`Tempbanned`)
    member.send(tempbanPmEmbed);

    member.ban(reason)
      .catch(error => message.channel.send(`❌ | Sorry <@${message.author.id}>, I couldn't tempban because of: ${error}!`));
    message.channel.send(`✅ | <@${message.author.id}> just **tempbanned ${member.user.tag} for: ${args[1]}${args[2]}, because of: ${reason}**!`);

    let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
    if(!logChannel) return;

    const logEmbed = new Discord.RichEmbed()
    .setColor(0x003cff)
    .setTitle("Tempban")
    .setDescription(`**${message.author} tempbanned ${member.tag}**, for **${args[1]}${args[2]}**, because of **${reason}**!`)
    .setFooter("Tempban")
    .setTimestamp()
    logChannel.send(logEmbed);

    try {

      setTimeout(function () {

      message.guild.unban(member.id);
  
      message.channel.send(`:ballot_box_with_check: | **${member.user.tag} was unbanned**! (Tempban for ${args[1]}${args[2]}, because of ${reason})`);

      const logEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Unban")
      .setDescription(`**${member.user.tag} was unbanned**! (Tempban for ${args[1]}${args[2]}, because of ${reason})`)
      .setFooter("Unban")
      .setTimestamp()
      logChannel.send(logEmbed);
  
      }, 1000 * tempbanTime);

    } catch (err) {

      message.channel.send(`:x: | You forgot to give the duration of the tempban of this user!`);

      console.log(err);
    }
  }

  module.exports.help = {
    name: "tempban"
}
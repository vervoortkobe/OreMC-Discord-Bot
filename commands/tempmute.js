//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`:x: | I couldn't tempmute this user, because you don't have the KICK_MEMBERS perms!`);

    let tempmuteTime = args[1];
    let timeDuration = args[2];

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.find(r => r.name === "Muted");

    if(!member || !isNaN(tempmuteTime) || !tempmuteTime || !timeDuration) {
      const tempmuteUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle(`Tempmute`)
      .setDescription(`Usage: **${prefix}tempmute <user> <time> <m/h/d> <reason>**`)
      .setFooter(`Tempmute`)
      return message.channel.send(tempmuteUsageEmbed);
    }
    
    if(member.id === message.author.id) return message.channel.send(`:x: | You can't tempmute yourself!`);
    if(!member.bannable) return message.channel.send(`:x: | I couldn't tempmute this user! Does he/she have a higher role? Do I have ADMINISTRATOR perms?`);

    if(timeDuration === `m`) {
      tempmuteTime = (args[1])*60;
    }
    if(timeDuration === `h`) {
      tempmuteTime = (args[1])*3600
    }
    if(timeDuration === `d`) {
      tempmuteTime = (args[1])*86400;
    }

    
    if(!timeDuration === `m` || !timeDuration === `h` || !timeDuration === `d`) return message.channel.send(tempmuteUsageEmbed);
    
    let reason = args.slice(3).join(' ');
    if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    const tempmutePmEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Tempmuted`)
    .setDescription(`You're tempmuted on ${message.guild.name}, for ${args[1]}${args[2]}, because of ${reason}!`)
    .addField(`Server`, message.guild.name)
    .addField(`Duration`, `${args[1]}${args[2]}`)
    .addField(`Reason`, reason)
    .setFooter(`Tempmuted`)
    member.send(tempmutePmEmbed);

    if(!muteRole)
      message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      });
    member.addRole(muteRole);
    message.channel.send(`✅ | <@${message.author.id}> just **tempmuted ${member.user.tag}, for {args[1]}${args[2]}, because of ${reason}**!`);

    let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
    if(!logChannel) return;

    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Tempmute")
    .setDescription(`**${message.author} tempmuted ${member.tag}**, for **${args[1]}${args[2]}**, because of **${reason}**!`)
    .setFooter("Tempmute")
    .setTimestamp()
    logChannel.send(logEmbed);

    try {

      setTimeout(function () {
          
        if(!muteRole)
          message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions:[]
          });
        member.removeRole(muteRole);
  
      message.channel.send(`:ballot_box_with_check: | **${member.user.tag} was unmuted**! (Tempmute for ${args[1]}${args[2]}, because of ${reason})`);

      const logEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Unmute")
      .setDescription(`**${member.user.tag} was unmuted**! (Tempmute for ${args[1]}${args[2]}, because of ${reason})`)
      .setFooter("Unmute")
      .setTimestamp()
      logChannel.send(logEmbed);
  
      }, 1000 * tempmuteTime);

    } catch (err) {

      message.channel.send(`:x: | You forgot to give the duration for the tempmute of this user!`);

      console.log(err);
    }
  }

  module.exports.help = {
    name: "tempmute"
}
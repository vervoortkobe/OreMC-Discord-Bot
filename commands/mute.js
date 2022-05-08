//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions('KICK_MEMBERS')) return message.channel.send(`:x: | I couldn't mute this user, because you don't have the KICK_MEMBERS perms!`);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.find(r => r.name === "Muted");

    if(!member)
      return message.channel.send(":x: | The user I have to mute, isn't in this server!");
    if(member.id === message.author.id) 
      return message.channel.send(":x: | You can't mute yourself!");
    if(!member.kickable) return message.channel.send(`:x: | I couldn't mute this user! Doe he/she have a higher role? Do I have ADMINISTRATOR perms?`);
    if(member.roles.has(muteRole)) {
      return message.channel.send(`:x: | I couldn't mute this user, because he/she is already muted!`);
      
    } else {

    if(!muteRole)
      message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      });
    member.roles.add(muteRole);
      
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    const mutePmEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Muted`)
    .setDescription(`You're muted on ${message.guild.name}, because of ${reason}!`)
    .addField(`Server`, message.guild.name)
    .addField(`Reason`, reason)
    .setFooter(`Muted`)
    member.send(mutePmEmbed);

    message.channel.send(`:ballot_box_with_check: | **${message.author} muted ${member.user}**, because of **${reason}**!`)

    let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
    if(!logChannel) return;

    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Mute")
    .setDescription(`**${message.author} muted ${member.user.tag}**, because of **${reason}**!`)
    .setFooter("Mute")
    .setTimestamp()
    logChannel.send(logEmbed);
    }
  }

  module.exports.help = {
    name: "mute"
}
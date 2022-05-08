//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`:x: | I couldn't kick this user, because you do not have the KICK_MEMBERS perms!`);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.channel.send(`:x: | The user I have to kick, isnt in this server!`);
    if(member.id === message.author.id) return message.channel.send(`:x: | You can't kick yourself!`);
    if(!member.kickable) return message.channel.send(`:x: | I couldn't kick this user! Does he/she have a higher role? Do I have ADMINISTRATOR perms?`);
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    const kickPmEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Kicked`)
    .setDescription(`You were kicked from ${message.guild.name}, because of ${reason}!`)
    .addField(`Server`, message.guild.name)
    .addField(`Reason`, reason)
    .setFooter(`Kicked`)
    member.send(kickPmEmbed);
    
    await member.kick(reason)
      .catch(error => message.channel.send(`:x: | Sorry ${message.author}, I couldn't kick this user, because of ${error}!`));
    message.channel.send(`:ballot_box_with_check: | **${message.author} kicked ${member.user.tag}**, because of **${reason}**!`);

    let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
    if(!logChannel) return;

    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Kick")
    .setDescription(`**${message.author} kicked ${member.user.tag}**, because of **${reason}**!`)
    .setFooter("Kick")
    .setTimestamp()
    logChannel.send(logEmbed);
  }

  module.exports.help = {
    name: "kick"
}
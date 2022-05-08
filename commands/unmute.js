//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`:x: | I couldn't unmute this user, because you don't have the KICK_MEMBERS perms!`);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.find(r => r.name === "Muted");

    if(!member)
      return message.channel.send(":x: | The user I have to unmute, isn't in this server!");
    if(member.id === message.author.id) 
      return message.channel.send(":x: | You can't unmute yourself!");
    if(!member.kickable) return message.channel.send(`:x: | I couldn't unmute this user! Does he/she have a higher role? Do I have ADMINISTRATOR perms?`);
    
    try {
      if(!muteRole)
        message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        });
      member.roles.remove(muteRole);
    }
    catch(err) {
      return message.channel.send(":x: | I couldn't unmute this user, because he/she isn't muted!");
    }
    
    message.delete().catch(O_o=>{});
    
    const unmutePmEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Unmuted`)
    .setDescription(`You're unmuted on ${message.guild.name}!`)
    .addField(`Server`, message.guild.name)
    .setFooter(`Unmuted`)
    member.send(unmutePmEmbed);
    
    message.channel.send(`:ballot_box_with_check: | **${message.author} unmuted ${member.user}**!`)
    
    let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
    if(!logChannel) return;
    
    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Unmute")
    .setDescription(`**${message.author} unmuted ${member.user.tag}**!`)
    .setFooter("Unmute")
    .setTimestamp()
    logChannel.send(logEmbed);
  }

  module.exports.help = {
    name: "unmute"
}
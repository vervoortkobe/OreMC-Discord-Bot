//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
    if(!member) {
      
      message.guild.fetchInvites()
      .then(invites => {

        const userInvites = invites.array().filter(o => o.inviter.id === message.author.id);
        var userInviteCount = 0;
        for(var i=0; i < userInvites.length; i++) {
          var invite = userInvites[i];
          userInviteCount += invite['uses'];
        }

        const invitesEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Invites")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`You have invited \`${userInviteCount}\` users to this server!`)
        .setFooter("Invites")
        .setTimestamp()
        message.channel.send(invitesEmbed);
      }).catch(err => console.log(err));
      
    } else {
  
      message.guild.fetchInvites()
      .then(invites => {

        const userInvites = invites.array().filter(o => o.inviter.id === member.id);
        var userInviteCount = 0;
        for(var i=0; i < userInvites.length; i++) {
          var invite = userInvites[i];
          userInviteCount += invite['uses'];
        }

        const invitesEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Invites")
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`${member} has invited \`${userInviteCount}\` users to this server!`)
        .setFooter("Invites")
        .setTimestamp()
        message.channel.send(invitesEmbed);
      }).catch(err => console.log(err));
    }
  }

  module.exports.help = {
    name: "invites"
}
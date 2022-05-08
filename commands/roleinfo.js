//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    let therole = args[0];
    if(!args[0]) return message.channel.send(`❌ | You forgot to give the role, I have to give info about!`);
    let findrole = message.guild.roles.find(r => r.name === therole || r.id === therole);
    let usershaverole = findrole.members.size;
    let whencreated = findrole.createdAt;

    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
    };

    let checkeddays = checkDays(whencreated);

    const roleinfoEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Role Info`)
    .setThumbnail(client.user.displayAvatarURL)
    .addField("Role", findrole)
    .addField("ID", `\`${findrole.id}\``)
    .addField("Role was created on", whencreated)
    .addField("How long ago", checkeddays)
    .addField("Amount of members", `\`${usershaverole}\``)
    .addField("Role Color", `\`#${findrole.color}\``)
    .setFooter("Role Info")
    .setTimestamp()
    message.channel.send(roleinfoEmbed);
  }

  module.exports.help = {
    name: "roleinfo"
}
//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: | I couldn't fetch this user's last warning, because you do not have the MANAGE_MESSAGES perms!`);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.channel.send(":x: | I couldn't fetch this user's last warning, because this user isn't in this server!")
//WARNREASONS
    let warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));
    if(!warnings[member.id]) {
      return message.channel.send(":x: | This user doesn't have any warnings yet!");
    }
    let warning = warnings[member.id].warnings;
//WARNCOUNTS
    let warncounts = JSON.parse(fs.readFileSync("./warncounts.json", "utf-8"));
    if(!warncounts[member.id]) {
      return;
    }
    let warncount = warncounts[member.id].warncounts;

    const lastwarningEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Last Warning`)
    .setThumbnail(member.user.displayAvatarURL)
    .addField(`User`, member)
    .addField(`Last Warning`, warning)
    .addField(`Amount Times Warned`, warncount)
    .setFooter(`Last Warning`)
    message.channel.send(lastwarningEmbed);
  }

  module.exports.help = {
    name: "lastwarning"
}
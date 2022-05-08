//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const helpEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Help")
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription("Commands (30):")
    .addField("**Tickets** (6)", `• ${prefix}add\n• ${prefix}close\n• ${prefix}remove\n• ${prefix}rename\n• ${prefix}ticket\n• ${prefix}transcript`)
    .addField("**MC Server** (3)", `• ${prefix}ip/${prefix}online/${prefix}version`)
    .addField("**Other** (6)", `• ${prefix}idea\n• ${prefix}invites\n• ${prefix}members/${prefix}leden\n• ${prefix}ping\n• ${prefix}roleinfo\n• ${prefix}snipe`)
    .addField("**Leveling** (1)", `• ${prefix}level/${prefix}lvl/${prefix}rank`)
    .addField("**Music** (2)", `• ${prefix}leave\n• ${prefix}play`)
    .addField("**Staff** (12)", `• ${prefix}announce\n• ${prefix}ban\n• ${prefix}clear\n• ${prefix}kick\n• ${prefix}lastwarning\n• ${prefix}mute\n• ${prefix}poll\n• ${prefix}say\n• ${prefix}tempban\n• ${prefix}tempmute\n• ${prefix}unmute\n• ${prefix}warn`)
    .setFooter("Help")
    .setTimestamp()
    message.channel.send(helpEmbed);
  }

  module.exports.help = {
    name: "help"
}
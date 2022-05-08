//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`:x: | I couldn't say your message, because you don't have ADMINISTRATOR perms!`);

    message.delete();

    const announceEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Announcement")
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription(args.join(" "))
    .setFooter("Announcement")
    .setTimestamp()
    message.channel.send(announceEmbed);
  }

  module.exports.help = {
    name: "announce"
}
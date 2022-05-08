//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: | You can't use this command, because you don't have the ADMINISTRATOR perms!`);

    if (!args.join(" ")) return message.channel.send(`:x: | You forgot to give the subject of the poll!`);

    message.delete();

    const pollEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Poll")
    .setDescription(args.join(" "))
    .setFooter("Poll")
    .setTimestamp()
    message.channel.send(pollEmbed)
    .then(embed => {
        embed.react("👍")
        .then(
          embed.react("👎"));
        });
  }

  module.exports.help = {
    name: "poll"
}
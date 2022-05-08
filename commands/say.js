//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: | I couldn't say your message, because you don't have the MANAGE_MESSAGES perms!`);

    message.delete();

    message.channel.send(args.join(" "));
  }

  module.exports.help = {
    name: "say"
}
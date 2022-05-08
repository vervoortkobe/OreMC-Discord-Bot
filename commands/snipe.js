//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
    let snipes = JSON.parse(fs.readFileSync("./snipes.json", "utf-8"));
    if(!snipes[message.channel.id]) {
      return message.channel.send(":x: | I couldn't snipe any messages in this channel!");
    }
    let msg = snipes[message.channel.id].msg;
    let when = snipes[message.channel.id].when;
    let auth = snipes[message.channel.id].auth;
    let authavatar = snipes[message.channel.id].authavatar;
    
    const snipeEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setAuthor(auth, authavatar)
    .setDescription(msg)
    .setFooter(when)
    message.channel.send(snipeEmbed);
  }

  module.exports.help = {
    name: "snipe"
}
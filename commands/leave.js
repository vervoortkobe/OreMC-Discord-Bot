//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");
const search = require("yt-search");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args, ops) => {
  
      if(!message.member.voiceChannel) return message.channel.send(`❌ | To do this, you have to be connected to a voice channel!`);

      if(!message.guild.me.voiceChannel) return message.channel.send(`❌ | I'm not connected to a voice channel yet!`);
      
      if(message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send(`❌ | We aren't connected to the same voice channel!`);
      
      message.guild.me.voiceChannel.leave();
      
      message.channel.send(`👋 | I left the voice channel!`);
  }

  module.exports.help = {
    name: "leave"
}
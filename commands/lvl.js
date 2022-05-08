//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args, ops) => {

    let lvl = require("../lvl.json");

    if(!lvl[message.author.id]) {
        lvl[message.author.id] = {
            lvl: 0
        };
      }

    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);

    if(!member) {
    
      let uLvl = lvl[message.author.id].lvl;

      if(uLvl >= 0 && uLvl <= 1000) xp = 0;
      if(uLvl >= 1000 && uLvl <= 2000) xp = 1;
      if(uLvl >= 2000 && uLvl <= 3000) xp = 2;
      if(uLvl >= 3000 && uLvl <= 4000) xp = 3;
      if(uLvl >= 4000 && uLvl <= 5000) xp = 4;
      if(uLvl >= 5000 && uLvl <= 6000) xp = 5;
      if(uLvl >= 6000 && uLvl <= 7000) xp = 6;
      if(uLvl >= 7000 && uLvl <= 8000) xp = 7;
      if(uLvl >= 8000 && uLvl <= 9000) xp = 8;
      if(uLvl >= 9000 && uLvl <= 10000) xp = 9;
      if(uLvl >= 10000 && uLvl <= 11000) xp = 10;

      const lvlEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Level")
      .setThumbnail(message.author.displayAvatarURL)
      .setDescription(`${message.author} is lvl \`${xp}\` and has \`${uLvl}\` xp!`)
      .addField("Level", `lvl \`${xp}\``)
      .addField("XP", `\`${uLvl}/${xp + 1}000\` xp`)
      .setFooter("Level")
      .setTimestamp()
      message.channel.send(lvlEmbed);

    } else {

      let uLvl = lvl[member.id].lvl;

      if(uLvl >= 0 && uLvl <= 1000) xp = 0;
      if(uLvl >= 1000 && uLvl <= 2000) xp = 1;
      if(uLvl >= 2000 && uLvl <= 3000) xp = 2;
      if(uLvl >= 3000 && uLvl <= 4000) xp = 3;
      if(uLvl >= 4000 && uLvl <= 5000) xp = 4;
      if(uLvl >= 5000 && uLvl <= 6000) xp = 5;
      if(uLvl >= 6000 && uLvl <= 7000) xp = 6;
      if(uLvl >= 7000 && uLvl <= 8000) xp = 7;
      if(uLvl >= 8000 && uLvl <= 9000) xp = 8;
      if(uLvl >= 9000 && uLvl <= 10000) xp = 9;
      if(uLvl >= 10000 && uLvl <= 11000) xp = 10;

      const lvlEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Level")
      .setThumbnail(message.author.displayAvatarURL)
      .setDescription(`${member} is lvl \`${xp}\` and has \`${uLvl}\` xp!`)
      .addField("Level", `lvl \`${xp}\``)
      .addField("XP", `\`${uLvl}/${xp + 1}000\` xp`)
      .setFooter("Level")
      .setTimestamp()
      message.channel.send(lvlEmbed);
    }
  }

  module.exports.help = {
    name: "lvl"
}
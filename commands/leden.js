//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
  let onlineCount = message.guild.members.cache.filter(member => member.presence.status === 'online').size;
  let idleCount = message.guild.members.cache.filter(member => member.presence.status === 'idle').size;
  let dndCount = message.guild.members.cache.filter(member => member.presence.status === 'dnd').size;
  let offlineCount = message.guild.members.cache.filter(member => member.presence.status === 'offline').size;

  const countEmbed = new Discord.MessageEmbed()
  .setColor(0x003cff)
  .setTitle(`Members`)
  .addField(`Total`, `\`${message.guild.memberCount}\` Total`, true)
  .addField(`Users`, `\`${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size}\` Users`, true)
  .addField(`Bots`, `\`${message.guild.members.cache.filter(member => member.user.bot).size}\` Bots`, true)
  .addField(`Online | Idle | DND | Offline`, `\`🟢 ${onlineCount}\` | \`🟡 ${idleCount}\` | \`🔴 ${dndCount}\` | \`⚫ ${offlineCount}\``, true)
  .setFooter(`Members`)
  .setTimestamp()
  message.channel.send(countEmbed);
}

  module.exports.help = {
    name: "leden"
}
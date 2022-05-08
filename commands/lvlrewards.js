//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args, ops) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const lvlrewardsEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`${client.user.username} • Level Rewards`)
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription(`• **<@&719237935094038620>**\n➟ Level nodig: lvl \`2\`\n➟ XP: \`2000\`\n• **<@&719237965259210783>**\n➟ Level nodig: lvl \`4\`\n➟ XP: \`4000\`\n• **<@&719237990458851429>**\n➟ Level nodig: lvl \`6\`\n➟ XP: \`6000\`\n• **<@&719238023228686336>**\n➟ Level nodig: lvl \`8\`\n➟ XP: \`8000\`\n• **<@&719238054094831657>**\n➟ Level nodig: lvl \`10\`\n➟ XP: \`10000\``)
    .setFooter("Level Rewards")
    .setTimestamp()
    message.channel.send(lvlrewardsEmbed)
  }

  module.exports.help = {
    name: "lvlrewards"
}
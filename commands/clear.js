//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`:x: | I couldn't delete these message, because you don't have the MANAGE_MESSAGES perms!`);

    if (!args[0]) return message.channel.send(`:x: | You forgot to give the amout of messages I have to delete!`);
    if(args[0] > 99) return message.channel.send(`:x: | You can delete a maximum of 99 messages at once!`)

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { });

        message.channel.send(`:ballot_box_with_check: | **${message.author} deleted ${amount - 1} messages**!`).then(msg => msg.delete({ timeout: 3000 }));
    
        let logChannel = message.guild.channels.cache.find(c => c.id === "710948340501839993");
        if(!logChannel) return;

        const logEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Clear")
        .setDescription(`**${message.author} deleted ${amount - 1} messages**!`)
        .setFooter("Clear")
        .setTimestamp()
        logChannel.send(logEmbed);

    } else {

        return message.channel.send(`:x: | You forgot to give the amount of messages I have to delete!`)
        .catch(error => message.channel.send(`:x: | I couldn't delete these messages, because of ${error}!`));

    }
  }

  module.exports.help = {
    name: "clear"
}
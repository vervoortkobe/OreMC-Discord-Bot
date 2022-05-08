//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if (!args.join(" ")) return message.channel.send(`:x: | You forgot to give the subject of your idea!`);

    message.delete();

    message.channel.send(`:ballot_box_with_check: | ${message.author}, your idea was submitted!`);

    let ideeChannel = client.guilds.get("707891608749867088").channels.find(c => c.id === "710945829753454602");
    if(!ideeChannel) return message.channel.send(":x: | I couldn't submit your idea, because I couldn't find the idea channel!");

    const ideeEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Idea")
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .setDescription(args.join(" "))
    .setFooter("Idea")
    .setTimestamp()
    ideeChannel.send(ideeEmbed)
    .then(embed => {
        embed.react("👍")
        .then(embed.react("👎"));
    });
  }

  module.exports.help = {
    name: "idea"
}
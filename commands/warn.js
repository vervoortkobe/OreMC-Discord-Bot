//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`:x: | I couldn't warn this user, because you don't have the MANAGE_MESSAGES perms!`);

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member)
        return message.channel.send("`:x: | The user I have to warn, isn't in this server!");
      if(member.id === message.author.id)
        return message.channel.send(":x: | You can't warn yourself!");
      if(!member.kickable) 
      return message.channel.send(":x: | I couldn't warn this user! Does he/she have a higher role? Do I have MANAGE_MESSAGES perms?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "no reason given";

    message.delete();

    const warnPmEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle(`Warned`)
    .setDescription(`You're warned on ${message.guild.name}, because of ${reason}!`)
    .addField(`Server`, message.guild.name)
    .addField(`Reason`, reason)
    .setFooter(`Warned`)
    member.send(warnPmEmbed);

    message.channel.send(`:ballot_box_with_check: | **${message.author} warned ${member}**, because of **${reason}**!`);
//WARNREASONS
    let warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

    warnings[member.user.id] = {
      warnings: reason
    };

    fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
      if (err) console.log(err)
    });
//WARNCOUNTS
    let warncounts = JSON.parse(fs.readFileSync("./warncounts.json", "utf-8"));
    if(!warncounts[member.id]) warncounts[member.id] = { warncounts: 1 };

    else warncounts[member.id].warncounts++;

    fs.writeFileSync("./warncounts.json", JSON.stringify(warncounts), (err) => {
      if (err) console.log(err)
    });

    let logChannel = message.guild.channels.cache.find(c => c.id === "711265216633110630");
    if(!logChannel) return;

    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Warn")
    .setDescription(`**${message.author} warned ${member}**, because of **${reason}**!`)
    .setFooter("Warn")
    .setTimestamp()
    logChannel.send(logEmbed);
  }

  module.exports.help = {
    name: "warn"
}
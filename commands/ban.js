//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: | I couldn't ban this user, because you don't have the BAN_MEMBERS perms!`);

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);

    if(!args[0]) return message.channel.send(`:x: | The user I have to ban, isn't in this server!`);
    if(!member) {
      if(!isNaN(member)) return message.channel.send(`:x: | The user I have to ban, isn't in this server!\nSo you have to give the ID of the user to ban him.`);

      let reason = args.slice(1).join(' ');
      if(!reason) reason = "The ban hammer has spoken!";

      message.delete().catch(O_o=>{});

      let bans = JSON.parse(fs.readFileSync("./bans.json", "utf8"));
      bans.push(args[0]);
      fs.writeFile("./bans.json", JSON.stringify(bans), (err) => {
        if(err) console.log(err), message.channel.send(":x: | Something went wrong while banning this user!");
        message.channel.send(`:ballot_box_with_check: | **${message.author} banned ${args[0]}**, because of **${reason}**!`);
      });

      let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
      if(!logChannel) return;

      const logEmbed = new Discord.RichEmbed()
      .setColor(0x003cff)
      .setTitle("Ban")
      .setDescription(`**${message.author} banned ${args[0]}**, because of **${reason}**!`)
      .setFooter("Ban")
      .setTimestamp()
      logChannel.send(logEmbed);

    } else {

      if(member.id === message.author.id) return message.channel.send(`:x: | You can't ban yourself!`);
      if(!member.bannable) return message.channel.send(`:x: | I couldn't ban this user! Does he/she have a higher role? Do I have ADMINISTRATOR perms?`);

      let reason = args.slice(1).join(' ');
      if(!reason) reason = "The ban hammer has spoken!";

      message.delete().catch(O_o=>{});

      const banPmEmbed = new Discord.RichEmbed()
      .setColor(0x003cff)
      .setTitle(`Banned`)
      .setThumbnail(client.user.displayAvatarURL)
      .setDescription(`You're banned on ${message.guild.name}, because of ${reason}!`)
      .addField(`Server`, message.guild.name)
      .addField(`Reason`, reason)
      .setFooter(`Banned`)
      member.send(banPmEmbed);
      
      await member.ban(reason)
        .catch(error => message.channel.send(`:x: | Sorry ${message.author}, I couldn't ban this user, because of ${error}!`));
      message.channel.send(`:ballot_box_with_check: | **${message.author} banned ${member.user.tag}**, because of **${reason}**!`);

      let logChannel = message.guild.channels.find(c => c.id === "711265216633110630");
      if(!logChannel) return;

      const logEmbed = new Discord.RichEmbed()
      .setColor(0x003cff)
      .setTitle("Ban")
      .setDescription(`**${message.author} banned ${member.tag}**, because of **${reason}**!`)
      .setFooter("Ban")
      .setTimestamp()
      logChannel.send(logEmbed);
    }
  }

  module.exports.help = {
    name: "ban"
}
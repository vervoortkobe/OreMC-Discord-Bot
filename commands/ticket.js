//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    let reason = message.content.split(" ").slice(1).join(" ");

    if(!reason) reason = "no reason given";
    if(!message.guild.roles.exists(r => r.id === "711596459480449074")) return console.log("NO OREMC SUPPORT ROLE FOUND");
    const existingTicket = message.guild.channels.find(c => c.name === `ticket-${message.author.username.toLowerCase()}`);
  
    if(!existingTicket) {

    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        let role1 = message.guild.roles.find(r => r.id === "711596459480449074");
        let role2 = message.guild.roles.find(r => r.name === `@everyone`);
        c.overwritePermissions(role1, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            ATTACH_FILES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false,
            READ_MESSAGE_HISTORY: false,
            ATTACH_FILES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            ATTACH_FILES: true
        });
        c.setTopic(`**${message.author}** made this ticket, because of **${reason}**!`)
        
        c.setParent("710950320792010753");
      
        setTimeout(() => {
          const ticketEmbed = new Discord.RichEmbed()
          .setColor(0x003cff)
          .addField(`New Ticket!`, `**Ticket Owner:** ${message.author}\n**Reason:** ${reason}`)
          .setTimestamp()
          c.send(ticketEmbed)
      
          const notificationTagRole = message.guild.roles.find(r => r.id === "711596459480449074");
          c.send(`> ${notificationTagRole}`).then(msg => msg.delete(3000));
        }, 1000);
      
        message.channel.send(`:ballot_box_with_check: | ${message.author}, your ticket was made: ${c}!`);

        let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));

        ticketowners[c.id] = {
          ticketowners: message.author.id
        };

        fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
          if (err) console.log(err)
        });

        let logChannel = message.guild.channels.find(c => c.id === "711888583618854922");
        if(!logChannel) return;
    
        const logEmbed = new Discord.RichEmbed()
        .setColor(0x003cff)
        .setTitle("Ticket Created")
        .setDescription(`**${message.author}** created a new ticket: **#${c.name}**, because of **${reason}**!`)
        .setFooter("Ticket Created")
        .setTimestamp()
        logChannel.send(logEmbed);

      }).catch(console.error);
      
    } else {
      
      return message.channel.send(`:x: | You already created a ticket!`);
    }
  }

  module.exports.help = {
    name: "ticket"
}
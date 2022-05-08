//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(!message.author.id === "408289224761016332" || !message.author.id === "572686917938970644") return; //Tsunami#6271 & Stkstaartje#1679

    message.delete();

    const rrsetupEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Rollen Kiezen")
    .setDescription(`__**Wil je graag volgende rollen?**__
    \n• **<@&711200912219308053>**\nKrijg een tag als er een __nieuwe update__ is,\nbij belangrijke mededelingen gebruiken we alsnog @everyone\n➟ Reageer dan met 📢
    \n• **<@&711204367663104012>**\nKrijg toegang tot een kanaal waar wekelijks __leuke vragen__ in worden gesteld\n➟ Reageer dan met 📥
    \n• **<@&758395243841323029>**\nKrijg toegang tot een __kanaal waar enkel Nederlands__ mag gesproken worden\n➟ Reageer dan met 🇳🇱
    `)
    .setFooter("Rollen Kiezen")
    .setTimestamp()
    message.channel.send(rrsetupEmbed)
    .then(e => {
      e.react("📢");
      e.react("📥");
      e.react("🇳🇱");
    })
  }

  module.exports.help = {
    name: "rrsetup"
}
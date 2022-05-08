//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
    const m = await message.channel.send("> ⚙️ | Calculating...");
    m.edit(`> 🏓 | **Pong!!!**\n> 🤖 | Latency: \`${m.createdTimestamp - message.createdTimestamp}\`ms,\n> 🖥️ | Discord API: \`${Math.round(client.ws.ping)}\`ms!`);
  }

  module.exports.help = {
    name: "ping"
}
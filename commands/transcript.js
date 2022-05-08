//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    let loading = client.emojis.get("615988699796340768");

    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`:x: | You can use this command in tickets only!`);

    message.delete();
    message.channel.send(`${loading} | The transcript is being created...`).then(m => {
      setTimeout(() => {
        m.delete();
      }, 3000);
    }).catch(err => (console.log(err)));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    message.channel.fetchMessages()
      .then(messages => {

        var text;

        for (let [key, value] of messages) {
          const date = new Date(value.createdTimestamp);
          let dateString = `${date.getDate()}/${date.getMonth()} ${date.getHours()}h ${date.getMinutes()}m`;
          let avatars = "<img src=" + value.author.displayAvatarURL + ">";

          if(value.content.includes("https") && value.content.includes("_")) {
            let filtered = value.content.match(/\bhttps?:\/\/\S+/gi);
            text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${dateString}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i><a href=${filtered}>${value.content}</a></i></div>`;
          } else {
            if(value.content.includes("https")) {
              let filtered = value.content.match(/\bhttps?:\/\/\S+/gi);
              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${dateString}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=${filtered}>${value.content}</a></div>`;
            } else {
              if(value.content.includes("_")) {
                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${dateString}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>${value.content}</i></div>`;
              } else {
              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${dateString}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
              }
            }
          }
        }
  
        let style = "body { background-color: #36393f; color: white; font-family: 'Lobster', cursive; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
        let body = `<head><title>Ticket Transcript • #${message.channel.name}</title><link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></head><body>${text}</body><style>${style}</style>`;
        let output = body.replace("undefined", "<br>");
  
        fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
          if (err) console.log(err)
        });
  
        message.channel.send({ file: "./ticket-transcript.html" });
      });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let logChannel = message.guild.channels.find(c => c.id === "711888583618854922");
    if(!logChannel) return;
          
    const logEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Ticket Transcript")
    .setDescription(`**${message.author}** created a transcript** of ticket **#${message.channel}**!\nCheck the transcript below this message.`)
    .setFooter("Ticket Transcript")
    .setTimestamp()
    logChannel.send(logEmbed);

    logChannel.send({ file: "./ticket-transcript.html" });
  }

  module.exports.help = {
    name: "transcript"
}
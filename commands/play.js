//const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");
const search = require("yt-search");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args, ops) => {
  
      if(!message.member.voiceChannel) return message.channel.send(`❌ | You have to be connected to a voice channel!`);
      if(!args[0]) return message.channel.send(`❌ | You forgot to give me the title of the song I have to play!`);
      
      var validate = await ytdl.validateURL(args[0]);
      if(!validate) {
        
        
        
        
        
              search(args.join(" "), function (err, res) {
        if(err) return message.channel.send(`❌ | ERROR: ${err}`);
        
        var videos = res.videos.slice(0, 10);
        if(videos.length === 0) return message.channel.send(":x: | ERROR: I couldn't find any songs!");
        
        var response = "";
        
        for(var i in videos) {
          response += `**[${parseInt(i) + 1}]:** ${videos[i].title} \r\n`;
        }
        
        response += `✅ | Choose a song between \`1-${videos.length}\`!`;
        
        message.channel.send(response);
        
        const filter = music => !isNaN(parseInt(music.content)) && music.content < videos.length && music.content > 0;
                                       
        const collection = message.channel.createMessageCollector(filter);
        
        collection.videos = videos;
        
        collection.once("collect", function (music) {
          var commandFile = require("./play.js");
          
          commandFile.run(client, message, [this.videos[parseInt(music.content) - 1].url], ops)
        });
      });
        
        
        
        
        
      } else {
      
      
      
      
      
      
      
      
      
        
      var info = await ytdl.getInfo(args[0]);
      
      var options = { seek: 0, volume: 1 };
      
      var voiceConnection = message.member.voiceChannel.join()
      .then(voiceChannel => {
        var stream = ytdl(args[0], { filter: "audioonly" });
        var streamDispatch = voiceChannel.playStream(stream, options);
      }).catch(err => console.log(err));
      message.channel.send(`🎶 | Playing **${info.title}**!`);
      }
  }

  module.exports.help = {
    name: "play"
}
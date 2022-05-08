const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.use(express.static("public"));
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

//const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const client = new Discord.Client({ disableEveryone: true, ws: { intents: new Discord.Intents(Discord.Intents.ALL) }, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
let process.env.PREFIX = "!";
let prefix = process.env.PREFIX;
const lvl = require("./lvl.json");

fs.readdir("./commands/", (err, files) => {
 
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Can/'t find the commands map!");
      return;
    }
   
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} was loaded!`);
      client.commands.set(props.help.name, props);
    });
  });


  client.on("ready", async () => {
    console.log(`${client.user.tag} was started!`);
    let oremcguild = client.guilds.cache.get("707891608749867088");
    let replies = ["play.oremc.nl", "!help", "!ticket", "OreMC", `${oremcguild.members.cache.filter(member => !member.user.bot).size} members!`];
    let result = Math.floor((Math.random() * replies.length));

    setInterval(() => {
        if(replies[result] === "play.oremc.nl") {
            client.user.setActivity(`${replies[result]}`, {type: "PLAYING"});
        } else {
            client.user.setActivity(`${replies[result]}`, {type: "WATCHING"});
        }
    }, 1000 * 30);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//JOIN
  client.on("guildMemberAdd", async member => {

    let jlChannel = member.guild.channels.cache.find(c => c.id === "710948366644805773");
    if(!jlChannel) return;

    const joinEmbed = new Discord.MessageEmbed()
    .setColor(0x00ff00)
    .setTitle("Join")
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription("Welcome to " + member.guild.name + ", ***" + member.user.tag + "***!\nWe hope you will have a nice time here! :grin:")
    .setFooter(member.guild.members.cache.filter(member => !member.user.bot).size + " members!")
    .setTimestamp()
    jlChannel.send(joinEmbed);
    
    client.channels.cache.get("710968684721602590").setName(`📈 | Total: ${member.guild.memberCount}`);
    client.channels.cache.get("710968770683732001").setName(`😄 | Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get("710968869245681765").setName(`🤖 | Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

    let autorole = member.guild.roles.cache.find(r => r.id === "710951085673808012");
    if(!autorole) return;

    member.roles.add(autorole);

    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    };

    if(Date.now() - member.user.createdAt < 1000 * 7889232) {
      let altAlertsChannel = member.guild.channels.cache.find(c => c.id === "710974400429817968");

      const altAlertEmbed = new Discord.MessageEmbed()
      .setColor(0x003cff)
      .setTitle("Alt Alert")
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`**${member}** is suspicious!`)
      .addField("Registered on", member.user.createdAt)
      .addField("How long ago", checkDays(member.user.createdAt))
      .setFooter(member.guild.members.cache.filter(member => !member.user.bot).size + " members!")
      .setTimestamp()
      altAlertsChannel.send(altAlertEmbed);
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//LEAVE
  client.on("guildMemberRemove", async member => {

    let jlChannel = member.guild.channels.cache.find(c => c.id === "710948366644805773");
    if(!jlChannel) return;

    const leaveEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setTitle("Leave")
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`***${member.user.tag}*** left ${member.guild.name}!\nWe hope you had a nice time here! :cry:`)
    .setFooter(member.guild.members.cache.filter(member => !member.user.bot).size + " members!")
    .setTimestamp()
    jlChannel.send(leaveEmbed);
    
    client.channels.cache.get("710968684721602590").setName(`📈 | Total: ${member.guild.memberCount}`);
    client.channels.cache.get("710968770683732001").setName(`😄 | Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get("710968869245681765").setName(`🤖 | Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_LOGS
  client.on("messageDelete", async delMsg => {
    let msglogChannel = delMsg.guild.channels.cache.find(c => c.id === "710948340501839993");
    if(!msglogChannel) return;

    msgdelEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Message Deleted")
    .setThumbnail(delMsg.author.displayAvatarURL)
    .setDescription("A message from **" + delMsg.author.tag + "** in **" + delMsg.channel + "** was **deleted**!")
    .addField("Deleted Message", "\`\`\`" + delMsg.content + "\`\`\`")
    .setFooter("Message Deleted")
    .setTimestamp()
    msglogChannel.send(msgdelEmbed);
    
//SNIPE_LOG
    var snipes = require("./snipes.json");
    
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
      };
    
    snipes[delMsg.channel.id] = {
      msg: delMsg.content,
      when: checkDays(delMsg.createdAt),
      auth: delMsg.author.tag,
      authavatar: delMsg.author.displayAvatarURL
    };
    
    fs.writeFile("./snipes.json", JSON.stringify(snipes), function(err) {
      if(err) console.log(err);
    });
    
  });

  client.on("messageUpdate", async (oldMsg, newMsg) => {

    if(oldMsg.content === "" || newMsg.content === "") return;
    let msglogChannel = newMsg.guild.channels.cache.find(c => c.id === "710948340501839993");
    if(!msglogChannel) return;

    msgupdEmbed = new Discord.MessageEmbed()
    .setColor(0x003cff)
    .setTitle("Message Updated")
    .setThumbnail(newMsg.author.displayAvatarURL)
    .setDescription("**" + newMsg.author.tag + "** has updated a message in **" + newMsg.channel + "**!")
    .addField("Old Message", "\`\`\`" + oldMsg.content + "\`\`\`")
    .addField("New Message", "\`\`\`" + newMsg.content + "\`\`\`")
    .setFooter("Message Updated")
    .setTimestamp()
    msglogChannel.send(msgupdEmbed);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOMOD_ANTISPAM
  const AntiSpam = require('discord-anti-spam');
  const antiSpam = new AntiSpam({
      warnThreshold: 5,
      kickThreshold: 10,
      banThreshold: 15,
      maxInterval: 2000,
      warnMessage: ':helmet_with_cross: | **Automod** has ** warned ${@user}**, because of **spamming**!',
      kickMessage: ':helmet_with_cross: | **Automod** has **kicked ${user_tag}**, because of **spamming**!',
      banMessage: ':helmet_with_cross: | **Automod** has **banned ${user_tag}**, because of **spamming**!',
      maxDuplicatesWarning: 5,
      maxDuplicatesKick: 10,
      maxDuplicatesBan: 15,
      exemptPermissions: ['ADMINISTRATOR'],
      ignoreBots: true,
      verbose: true
  });

  client.on('message', async message => antiSpam.message(message)); 

/////////////////////////////////////////////////////////////////////////////////////////////
//REACTION_ROLES
  client.on("messageReactionAdd", async (reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(reaction.message.channel.id === "711201549149536277" && reaction.message.id === "809403116767805540" && !user.bot && reaction.message.author.id === client.user.id) {

      if(reaction.emoji.name === "📢") {
        const updates = reaction.message.guild.roles.cache.find(r => r.id === "711200912219308053");
        if(!updates) console.log("no updates role");
        let member = reaction.message.guild.members.cache.find(m => m.id === user.id);
        member.roles.add(updates);
      }

      if(reaction.emoji.name === "📥") {
        const polls = reaction.message.guild.roles.cache.find(r => r.id === "711204367663104012");
        if(!polls) console.log("no polls role");
        let member = reaction.message.guild.members.cache.find(m => m.id === user.id);
        member.roles.add(polls);
      }

      if(reaction.emoji.name === "🇳🇱") {
        const dutch = reaction.message.guild.roles.cache.find(r => r.id === "758395243841323029");
        if(!dutch) console.log("no dutch role");
        let member = reaction.message.guild.members.cache.find(m => m.id === user.id);
        member.roles.add(dutch);
      }
    }
  });

  client.on("messageReactionRemove", async (reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(reaction.message.channel.id === "711201549149536277" && reaction.message.id === "809403116767805540" && !user.bot && reaction.message.author.id === client.user.id) {

      if(reaction.emoji.name === "📢") {
        const updates = reaction.message.guild.roles.cache.find(r => r.id === "711200912219308053");
        if(!updates) console.log("no updates role");
        let member = reaction.message.guild.members.cache.find(m => m.id === user.id);
        member.roles.remove(updates);
      }

      if(reaction.emoji.name === "📥") {
        const polls = reaction.message.guild.roles.cache.find(r => r.id === "711204367663104012");
        if(!polls) console.log("no polls role");
        let member = reaction.message.guild.members.cache.find(m => m.id === user.id);
        member.roles.remove(polls);
      }

      if(reaction.emoji.name === "🇳🇱") {
        const dutch = reaction.message.guild.roles.cache.find(r => r.id === "758395243841323029");
        if(!dutch) console.log("no dutch role");
        let member = reaction.message.guild.members.cache.find(m => m.id === user.id);
        member.roles.remove(dutch);
      }
    }
  });

////////////////////////////////////////////////////////////////////////////////////////////////////

  client.on("messageReactionAdd", async (reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    const v = ":white_check_mark:";
    const x = ":x:";
    const loading = ":gear:";
    
////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE TICKET REACTION

    if(!user.bot && reaction.message.author.id === client.user.id && reaction.message.channel.id === "816294789364187167") {
      if(reaction.emoji.name === "🎫") {
        reaction.message.reactions.resolve("🎫").users.remove(user);

        let reason = "No reason given";
        let ticketsupportrolefind = reaction.message.guild.roles.cache.find(r => r.name === `OreMC Support`);
        if(!ticketsupportrolefind) return reaction.message.channel.send(`${x} | This server doesn't have a **OreMC Support** role, so the ticket won't be created!\nIf you're an Administrator, pls create a \`OreMC Support\` role and give it to users that should be able to manage the tickets.`);
        let existingTicket = reaction.message.guild.channels.cache.find(c => c.name === `ticket-${user.username.toLowerCase().replace(" ", "-")}-${user.discriminator}`);
        
        if(existingTicket) {
          return reaction.message.channel.send(`${x} | You already created a ticket!`)
          .then(m => m.delete({ timeout: 5000 }));
        } else {

          reaction.message.guild.channels.create(`ticket-${user.username.toLowerCase()}-${user.discriminator}`, { type: "text", topic: `This ticket was created by ${user}, because of: ${reason}!` }).then(c => {

            setTimeout(() => {

              let everyone = reaction.message.guild.roles.everyone;

              c.updateOverwrite(user, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true, 
                "ADD_REACTIONS": false
              });

              c.updateOverwrite(ticketsupportrolefind, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true, 
                "ADD_REACTIONS": false
              });

              c.updateOverwrite(everyone, {
                "SEND_MESSAGES": false,
                "VIEW_CHANNEL": false,
                "READ_MESSAGE_HISTORY": false,
                "ATTACH_FILES": false, 
                "ADD_REACTIONS": false
              });

            }, 2000);
               
              c.setParent("710950320792010753");

              let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));

              ticketowners[c.id] = {
                ticketowners: user.id
              };

              fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
                if(err) console.log(err);
              });

            setTimeout(() => {
              const ticketEmbed = new Discord.MessageEmbed()
              .setColor(0x003cff)
              .addField(`Hey, ${user.tag}!`, `**You've made a ticket, because of:** \`${reason}\`**!**\nPls explain your request as detailed as possible!\nOur **Support Team** will help you as fast as possible!`)
              .addField(`Do you want to close this ticket?`, `Simply **react** with the \`🗑️\` reaction on this message!`)
              .addField(`Do you want to create a transcript of this ticket?`, `Simply **react** with the \`📝\` reaction on this message!`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              c.send(ticketEmbed).then(m => {
                m.react("🗑️");
                m.react("📝");
              });
                  
              const ticketSupportRole = reaction.message.guild.roles.cache.find(r => r.name === `OreMC Support`);
              c.send(`> ${ticketSupportRole}`).then(msg => msg.delete({ timeout: 3000 }));
            }, 1000);
                  
            reaction.message.channel.send(`${v} | ${user}, your ticket has been created: ${c}!`)
            .then(m => m.delete({ timeout: 5000} ));

            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(!logChannel) return;
                
            const ticketLogEmbed = new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setTitle(`⚙️ | Logs`)
            .addField(`TICKET_CREATE`, `**${user.tag} created a new ticket: #${c.name}**, because of: **${reason}**!`)
            .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
            .setTimestamp()
            logChannel.send(ticketLogEmbed);

          });
        }
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////
//CLOSE TICKET REACTION

    if(reaction.message.channel.name.startsWith("ticket-") && reaction.message.channel.name !== "ticket-creation" && reaction.message.channel.name !== "ticket-logs" && !user.bot && reaction.message.author.id === client.user.id) {
      if(reaction.emoji.name === "🗑️") {
        reaction.message.reactions.resolve("🗑️").users.remove(user);

        //DELETED IN TICKETCAT & NO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER & LOGS

        reaction.message.channel.send(`${v} | I will ***delete*** this ticket in 10 seconds...`)

        await reaction.message.channel.messages.fetch()
        .then(messages => {

          var text;

          for(let [key, value] of messages) {
            const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

            let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

            if(value.embeds[0]) {
              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
            }

            text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
          }
      
          let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
          let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
          let output = body.replace("undefined", "<br>");
      
          fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
            if(err) console.log(err);
          });

        });

        let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
        if(ticketowners[reaction.message.channel.id]) {
          let ticketowner = ticketowners[reaction.message.channel.id].ticketowners;

          reaction.message.guild.members.fetch(`${ticketowner}`)
          .then(findTicketowner => {
            if(findTicketowner) {
              const dmTicketownerEmbed = new Discord.MessageEmbed()
              .setColor(0x003cff)
              .setTitle(`⚙️ | Ticket Deleted`)
              .setDescription(`Your **ticket** (${reaction.message.channel.name}) was **deleted**!\nIf you want a transcript of it, check the file below this message. ⬇️`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              findTicketowner.send(dmTicketownerEmbed);
              findTicketowner.send({ files: ["./ticket-transcript.html"] });
            }
          });
        }

        setTimeout(() => {

          reaction.message.channel.delete();
            
          const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
          if(!logChannel) return;
        
          const deleteLogEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle(`⚙️ | Logs`)
          .addField(`TICKET_DELETE`, `**${user.tag} deleted a ticket: #${reaction.message.channel.name}**!\nI have created a **transcript** of **this ticket**!\nCheck the file below this message. ⬇️`)
          .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
          .setTimestamp()
          logChannel.send(deleteLogEmbed);
          logChannel.send({ files: ["./ticket-transcript.html"] });

        }, 10000);
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////
//CREATE TRANSCRIPT REACTION

    if(reaction.message.channel.name.startsWith("ticket-") && reaction.message.channel.name !== "ticket-creation" && reaction.message.channel.name !== "ticket-logs" && !user.bot) {
      if(reaction.emoji.name === "📝" && reaction.message.author.id === client.user.id) {
        reaction.message.reactions.resolve("📝").users.remove(user);

        reaction.message.channel.send(`${loading} | The transcript is being created...`)
        .then(m => m.delete({ timeout: 3000 }));

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        reaction.message.channel.messages.fetch()
          .then(messages => {

            var text;

            for(let [key, value] of messages) {
              const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

              let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

              if(value.embeds[0]) {
                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
              }

              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
            }
        
            let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
            let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
            let output = body.replace("undefined", "<br>");
        
            fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
              if(err) console.log(err);
            });

            setTimeout(() => {
      
              const transcriptEmbed = new Discord.MessageEmbed()
              .setColor(0x003cff)
              .setTitle(`⚙️ | Transcript`)
              .setDescription(`**${user}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\nCheck the file below this message. ⬇️`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              reaction.message.channel.send(transcriptEmbed);
              reaction.message.channel.send({ files: ["./ticket-transcript.html"] });

            }, 500);
          });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let logChannel = reaction.message.guild.channels.cache.find(c => c.name === "ticket-logs");
        if(!logChannel) return;
              
        const transcriptLogEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle(`⚙️ | Logs`)
        .setDescription(`**${user.tag}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\nCheck the file below this message. ⬇️`)
        .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
        .setTimestamp()
        logChannel.send(transcriptLogEmbed);
        logChannel.send({ files: ["./ticket-transcript.html"] });

      }
    }

  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
/////////////////////////////////////////////////////////////////////////////////////////////
//GALGJE
    let settings = JSON.parse(fs.readFileSync("./galgje.json", "utf8"));
    if (message.channel.id === settings.channel || (!settings.channel && message.channel.name.includes("galgje") && message.channel.id !== "722895546590822460")) {
        if (!settings.word) return nieuwWoord()

        let word = settings.word;
        let vooruitgang = settings.vooruitgang;
        let content = message.content.toLowerCase()
        let active = settings.active
        if(active == false) return message.channel.send("There aren't any words left! A Hangman Master will add new words as fast as possible!").then(m => m.delete({ timeout: 10000 }));
        if (message.author.id === settings.lastUser) return message.delete();
        settings.lastUser = message.author.id;
        fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
            if (err) console.log(err);
        });

        if (message.content.length == 1) {

            let juist = false;
            for (let i = 0; i < word.length; i++) {
                if (word.charAt(i) == content) {
                    juist = true;
                    settings.vooruitgang[i] = content
                    fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
                        if (err) console.log(err);
                    });
                }
            }

            if (juist == true) { // juist
                message.react("✅")
                updateMessage()

            } else { // fout
                message.react("❌")
                settings.guesses += 1
                settings.levens -= 1

                let fout = true;
                for (let i = 0; i < settings.fouteLetters.length; i++) {
                    if (settings.fouteLetters[i] == content) {
                        fout = false
                    }
                }
                if (fout == true) settings.fouteLetters.push(content)


                fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
                    if (err) console.log(err);
                });
                updateMessage()


            }
        } else {

            if (message.content.toLowerCase() == settings.word) { // woord geraden!
                message.channel.messages.fetch(settings.msg).then(async msg => {
                    msg.edit(new Discord.MessageEmbed()
                        .setTitle("Hangman")
                        .setDescription(`${message.author} guessed the word.\nThe word was \`${message.content.toLowerCase()}\`!`)
                        .setColor("#2cfc03")
                        .setTimestamp()
                    );
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    message.channel.send(new Discord.MessageEmbed()
                    .setTitle("Hangman • Word Guessed")
                    .setColor("#2cfc03")
                    .setDescription(`» ${message.author}, you have guessed the word!\nThe word was: \`${word}\`\nYou earned **50xp**!`)
                    .setTimestamp()
                    );
                    
                    if(!lvl[message.author.id]) {
                      lvl[message.author.id] = {
                        lvl: 50
                      };
                    }
                
                    let lvlAmt = Math.floor(Math.random() * 1) + 50;
                    let baseAmt = Math.floor(Math.random() * 1) + 50;
                
                    if(lvlAmt === baseAmt) {
                      lvl[message.author.id] = {
                        lvl: lvl[message.author.id].lvl + lvlAmt
                      };
                      fs.writeFile("./lvl.json", JSON.stringify(lvl), (err) => {
                        if(err) console.log(err)
                      });
                    }
                    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    nieuwWoord();
                });
                message.react("✅")
            } else { // fout
                message.react("❌")
                settings.fouteLetters.push(content)
                fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
                    if (err) console.log(err);
                });
            }

        }

        fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
            if (err) console.log(err);
        });


        async function nieuwWoord() {

            let words = JSON.parse(fs.readFileSync("./woorden.json", "utf8"));
            if (words.length < 1) {
                message.channel.send("There aren't any words left! A Hangman Master will add new words as fast as possible!");
                let galgjeKanaal = message.guild.channels.cache.get("722895546590822460");
                let galgjeMaster = message.guild.roles.cache.find(r => r.id === "722873333816754246");
                if(!galgjeMaster) console.log("I couldn't find the Hangman Master role!");
                if (galgjeKanaal) galgjeKanaal.send("There aren't any words left!\n${galgjeMaster}")
                else console.log("No Hangman channel found!")
                settings.active = false
                fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
                    if (err)
                        console.log(err);
                });
                return;
            } else {

                let msg = await message.channel.send(new Discord.MessageEmbed()
                .setTitle("Hangman")
                .setDescription("I have chosen a new word, good luck!")
                .setColor("#03bafc")
                .setTimestamp()
                );

                let random = Math.floor(Math.random() * words.length)
                let word = words[random]
                words.splice(random, 1);
                fs.writeFile("./woorden.json", JSON.stringify(words), (err) => {
                  if(err) console.log(err);
                });

                let levens = word.length + 1
                let galgjelogs = message.guild.channels.cache.find(c => c.id === "722895546590822460");
                if(!galgjelogs) console.log("I couldn't find Hangman logs!");
                galgjelogs.send(new Discord.MessageEmbed()
                .setTitle("Hangman • New Word")
                .setDescription(`» The new word is: \`${word}\``)
                .setColor("#03bafc")
                .setTimestamp()
                );

                settings = {
                    active: true,
                    channel: message.channel.id,
                    word: word,
                    lastUser: "",
                    guesses: 0,
                    levens: levens,
                    msg: msg.id,
                    vooruitgang: [],
                    fouteLetters: []
                };

                for (let x = 0; x < word.length; x++) {
                    settings.vooruitgang.push("_")
                }
                fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
                    if (err)
                        console.log(err);
                });

            }
        }

        async function updateMessage() {
            message.channel.messages.fetch(settings.msg).then(async message => {

                let levens = settings.levens;
                let juist = true
                for (let i = 0; i < word.length; i++) {
                    if (word.charAt(i) !== vooruitgang[i]) juist = false;
                }
                let geradenLetters = "`";
                for (let i = 0; i < vooruitgang.length; i++) {
                    geradenLetters += vooruitgang[i] + " ";
                }
                geradenLetters += "`"

                let fouteLettersBericht = "`";
                for (let i = 0; i < settings.fouteLetters.length; i++) {
                    fouteLettersBericht += settings.fouteLetters[i] + ", ";
                }
                fouteLettersBericht += " `"

                if (levens < 1) {
                    message.edit(new Discord.MessageEmbed()
                        .setTitle("Hangman • You didn't guess the word, I win!")
                        .setColor("#ff0000")
                        .setDescription(`**Progress:** ${geradenLetters}\n**Wrong letters:** ${fouteLettersBericht}\n**Lives left:** ${levens}`)
                        .setFooter("©OreMC Hangman")
                        .setTimestamp()

                    );
                    nieuwWoord();
                } else if (juist == true) {
                    let geradenUser = message.guild.members.cache.find(m => m.id === settings.lastUser);
                    if(!geradenUser) console.log("NO GERADEN_NUSER FOUND!");
                    await message.edit(new Discord.MessageEmbed()
                        .setTitle("Hangman • You guessed the word, you win!")
                        .setColor("#2cfc03")
                        .setDescription(`**Word:** ${word}\n**Progress:** ${geradenLetters}\n**Wrong letters:** ${fouteLettersBericht}\n**Lives left:** ${levens}\n**The word was guessed by ${geradenUser}!**`)
                        .setTimestamp()
                    );
                    nieuwWoord();
                } else {
                    message.edit(new Discord.MessageEmbed()
                        .setTitle("Hangman")
                        .setDescription(`**Progress:** ${geradenLetters}\n**Amount of letters:** ${word.length}\n**Wrong letters:** ${fouteLettersBericht}\n**Lives left:** ${levens}`)
                        .setColor("#03bafc")
                        .setTimestamp()
                    );
                }
            });
        }

    } else if (message.channel.id == process.env.GALGJEKANAAL) {
        if (message.content.startsWith("!addword") || message.content.startsWith("!addwoord")) {

            if (!message.member.roles.has("722873333816754246")) return message.channel.send("You don't have the permission to do this!");
            let words = JSON.parse(fs.readFileSync("./woorden.json", "utf8"));
            let args = message.content.split(" ").slice(1)
            if (!args[0]) return message.channel.send("You forgot to give a word!")
            words.push(args[0])
            fs.writeFile("./woorden.json", JSON.stringify(words), (err) => {
                if (err) console.log(err), message.channel.send("Something went wrong!")
                else message.channel.send(`The word \`${args[0]}\` was successfully added to the wordlist!`)
            });
            let settings = JSON.parse(fs.readFileSync("./galgje.json", "utf8"));
            if(settings.active == false) {
                
            settings.active = true
            await fs.writeFile("./galgje.json", JSON.stringify(settings), (err) => {
                if (err)
                    console.log(err);
            });
        }

        } else if (message.content.startsWith("!wordlist") || message.content.startsWith("!woordenlijst")) {
            let words = JSON.parse(fs.readFileSync("./woorden.json", "utf8"));
            let text = `Added Words (\`${words.length}\`):`;
            words.forEach(e => {
                text += `\n• \`${e}\``;
            });
            message.channel.send(new Discord.MessageEmbed().setTitle("Hangman • Wordlist!").setDescription(text).setColor("#03bafc").setTimestamp()
            );
        }

    }
    
/////////////////////////////////////////////////////////////////////////////////////////////
//LEVELING
    if(!lvl[message.author.id]) {
      lvl[message.author.id] = {
        lvl: 0
      };
    }

    let lvlAmt = Math.floor(Math.random() * 1) + 1;
    let baseAmt = Math.floor(Math.random() * 1) + 1;

    if(lvlAmt === baseAmt) {
      lvl[message.author.id] = {
        lvl: lvl[message.author.id].lvl + lvlAmt
      };
      fs.writeFile("./lvl.json", JSON.stringify(lvl), (err) => {
        if(err) console.log(err)
      });
    }
    
    let uLvl = lvl[message.author.id].lvl;
//LVL1
      if(uLvl > 999 && uLvl < 1001) {
        let xp = 1;

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/2000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL2
      if(uLvl > 1999 && uLvl < 2001) {
        let xp = 2;

        let coal = message.guild.roles.cache.find(r => r.id === "719237935094038620");
        if(!coal) console.log("NO COAL ROLE FOUND");
        message.member.roles.add(coal);

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/3000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL3
      if(uLvl > 2999 && uLvl < 3001) {
        let xp = 3;

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/4000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL4
      if(uLvl > 3999 && uLvl < 4001) {
        let xp = 4;

        let iron = message.guild.roles.cache.find(r => r.id === "719237965259210783");
        if(!iron) console.log("NO IRON ROLE FOUND");
        message.member.roles.add(iron);

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/5000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL5
      if(uLvl > 4999 && uLvl < 5001) {
        let xp = 5;

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/6000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL6
      if(uLvl > 5999 && uLvl < 6001) {
        let xp = 6;

        let gold = message.guild.roles.cache.find(r => r.id === "719237990458851429");
        if(!gold) console.log("NO GOLD ROLE FOUND");
        message.member.roles.add(gold);

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/7000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL7
      if(uLvl > 6999 && uLvl < 7001) {
        let xp = 7;

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/8000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL8
      if(uLvl > 7999 && uLvl < 8001) {
        let xp = 8;

        let diamond = message.guild.roles.cache.find(r => r.id === "719238023228686336");
        if(!diamond) console.log("NO DIAMOND ROLE FOUND");
        message.member.roles.add(diamond);

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/9000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL9
      if(uLvl > 8999 && uLvl < 9001) {
        let xp = 9;

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/10000\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }
//LVL10
      if(uLvl > 9999 && uLvl < 10001) {
        let xp = 10;

        let emerald = message.guild.roles.cache.find(r => r.id === "719238054094831657");
        if(!emerald) console.log("NO EMERALD ROLE FOUND");
        message.member.roles.add(emerald);

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("🆙 Level Up")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${xp}\``)
        .addField("Level", `lvl \`${xp}\``)
        .addField("XP", `\`${uLvl}/~\` xp`)
        .setFooter("Level Up")
        .setTimestamp()
        message.channel.send(lvlupEmbed);
      }

/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOMOD_ANTI_SWEAR
    if(message.content.includes("kanker") || message.content.includes("Kanker") || message.content.includes("KANKER") || 
       message.content.includes("kkr") || message.content.includes("Kkr") || message.content.includes("KKR") || 
       message.content.includes("cancer") || message.content.includes("Cancer") || message.content.includes("CANCER") || 
       message.content.includes("tyfus") || message.content.includes("Tyfus") || message.content.includes("TYFUS") || 
       message.content.includes("tering") || message.content.includes("Tering") || message.content.includes("TERING") || 
       message.content.includes("tantoe") || message.content.includes("Tantoe") || message.content.includes("TANTOE") || 
       message.content.includes("godverdomme") || message.content.includes("Godverdomme") || message.content.includes("GODVERDOMME") || 
       message.content.includes("fuck") || message.content.includes("Fuck") || message.content.includes("FUCK") || 
       message.content.includes("neger") || message.content.includes("Neger") || message.content.includes("NEGER") || 
       message.content.includes("nigger") || message.content.includes("Nigger") || message.content.includes("NIGGER") || 
       message.content.includes("nigga") || message.content.includes("Nigga") || message.content.includes("NIGGA") || 
       message.content.includes("mongool") || message.content.includes("Mongool") || message.content.includes("MONGOOL") || 
       message.content.includes("aids") || message.content.includes("Aids") || message.content.includes("AIDS") || 
       message.content.includes("autist") || message.content.includes("Autist") || message.content.includes("AUTIST") || 
       message.content.includes("downie") || message.content.includes("Downie") || message.content.includes("DOWNIE") ||
       message.content.includes("homo") || message.content.includes("Homo") || message.content.includes("HOMO") ||
       message.content.includes("gay") || message.content.includes("Gay") || message.content.includes("GAY") ||
       message.content.includes("klootzak") || message.content.includes("Klootzak") || message.content.includes("KLOOTZAK") ||
       message.content.includes("klote") || message.content.includes("Klote") || message.content.includes("KLOTE")
    ) {
      if(!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();

        message.channel.send(`:helmet_with_cross: | **Automod warned ${message.author}**, becuase of **swearing**!`);

        const automodsweardmEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Automod")
        .setThumbnail(client.user.displayAvatarURL)
        .setDescription(`**Automod warned you**, because of **swearing**!`)
        .addField(`Punishment`, `Warn`)
        .addField(`Reason`, `Swearing`)
        .addField(`In which channel`, message.channel)
        .addField(`Message`, message.content)
        .setFooter("Automod")
        .setTimestamp()
        message.author.send(automodsweardmEmbed);
        
        let msglogChannel = message.guild.channels.cache.find(c => c.id === "710948340501839993");
        if(!msglogChannel) return;
    
        const automodswearEmbed = new Discord.MessageEmbed()
        .setColor(0x003cff)
        .setTitle("Automod")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`**Autmod warned ${message.author.tag}**, because of **swearing**!`)
        .addField(`Punishment`, `Warn`)
        .addField(`Reason`, `Swearing`)
        .addField(`In which channel`, message.channel)
        .addField(`Message`, message.content)
        .setFooter("Automod")
        .setTimestamp()
        msglogChannel.send(automodswearEmbed);
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOMOD_ANTI_INVITES
    if(message.content.includes("https://discord.gg") || message.content.includes("https://discordapp.com/invite/") || message.content.includes("https://discord.com/invite/")) {
      if(message.channel.parent.id === "707891608749867090") {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            
            message.delete();
            message.channel.send(`:helmet_with_cross: | **Automod warned ${message.author}**, because of **advertising**!`);
            
            let automodcounts = JSON.parse(fs.readFileSync("./automodcounts.json", "utf-8"));
            if(!automodcounts[member.id]) automodcounts[member.id] = { automodcounts: 1 };
            
            else automodcounts[member.id].automodcounts++;
            
            let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
            if(automodcounts[member.id] === "3" || 
               automodcounts[member.id] === "6" || 
               automodcounts[member.id] === "9" || 
               automodcounts[member.id] === "12" || 
               automodcounts[member.id] === "15" || 
               automodcounts[member.id] === "18" || 
               automodcounts[member.id] === "21" || 
               automodcounts[member.id] === "24" || 
               automodcounts[member.id] === "27" || 
               automodcounts[member.id] === "30"
               ) {
                       
                if(!muteRole)
                  message.guild.createRole({
                  name: "Muted",
                  color: "#000000",
                  permissions: [{
                      deny: ["VIEW_CHANNELS", "SEND_MESSAGES"]
                  }]
                });
                member.roles.add(muteRole);
                
                setTimeout(() => {
                    
                    member.removeRole(muteRole);
                    
                    automodinvEmbed = new Discord.MessageEmbed()
                    .setColor(0x003cff)
                    .setTitle("Automod")
                    .setThumbnail(message.author.displayAvatarURL)
                    .setDescription(`**Autmod muted ${message.author.tag} for 1h**, because of **advertising in ${message.channel}**!`)
                    .addField(`Punishment`, `1h Mute`)
                    .addField(`Reason`, `Advertising`)
                    .addField(`In which channel`, message.channel)
                    .addField(`Invite`, message.content)
                    .setFooter("Automod")
                    .setTimestamp()
                    msglogChannel.send(automodinvEmbed);
                }, 1000 * 60 * 60);
                
                const automodinvunmutedmEmbed = new Discord.MessageEmbed()
                .setColor(0x003cff)
                .setTitle("Automod")
                .setThumbnail(client.user.displayAvatarURL)
                .setDescription(`**Automod unmuted you**!`)
                .addField(`Punishment`, `1h Mute`)
                .addField(`Reason`, `Advertising`)
                .addField(`In which server`, message.guild.name)
                .addField(`Invite`, message.content)
                message.author.send(automodinvunmutedmEmbed);
                
                let msglogChannel = message.guild.channels.cache.find(c => c.id === "710948340501839993");
                if(!msglogChannel) return;
            
                const automodinvunmuteEmbed = new Discord.MessageEmbed()
                .setColor(0x003cff)
                .setTitle("Automod")
                .setThumbnail(message.author.displayAvatarURL)
                .setDescription(`**Autmod muted ${message.author.tag} for 1h**, because of **advertising**!`)
                .addField(`Punishment`, `Mute`)
                .addField(`Reason`, `Advertising`)
                .addField(`In which channel`, message.channel)
                .addField(`Invite`, message.content)
                .setFooter("Automod")
                .setTimestamp()
                msglogChannel.send(automodinvunmuteEmbed);
               }

            fs.writeFileSync("./automodcounts.json", JSON.stringify(automodcounts), (err) => {
             if (err) console.log(err)
            });
            
            const automodinvdmEmbed = new Discord.MessageEmbed()
            .setColor(0x003cff)
            .setTitle("Automod")
            .setThumbnail(client.user.displayAvatarURL)
            .setDescription(`**Automod warned you**, because of **advertising in ${message.guild.name}**!`)
            .addField(`Punishment`, `Warn`)
            .addField(`Reason`, `Advertising`)
            .addField(`In which server`, message.guild.name)
            .addField(`Invite`, message.content)
            message.author.send(automodinvdmEmbed);
            
            let msglogChannel = message.guild.channels.cache.find(c => c.id === "710948340501839993");
            if(!msglogChannel) return;
        
            const automodinvEmbed = new Discord.MessageEmbed()
            .setColor(0x003cff)
            .setTitle("Automod")
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`**Autmod warned ${message.author.tag}**, because of **advertising in ${message.channel}**!`)
            .addField(`Punishment`, `Warn`)
            .addField(`Reason`, `Advertising`)
            .addField(`In which channel`, message.channel)
            .addField(`Invite`, message.content)
            .setFooter("Automod")
            .setTimestamp()
            msglogChannel.send(automodinvEmbed);
            
        } else {
            return;
        }
      } else {
          return;
      }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////
//PARTNER_COOLDOWN
    const partnerAdvertised = new Set();
    
    if(message.channel.id === "710947497425764353") {
        if(partnerAdvertised.has(message.author.id)) {
            
            let logchan = message.guild.channels.cache.find(c => c.id === "710948340501839993");
            const partnerAdvertisedEmbed = new Discord.MessageEmbed()
            .setColor(0x003cff)
            .setTitle("Partner Advertised Again Too Early")
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`**${message.author.tag} advertised again too early** in ${message.channel}!`)
            .addField(`Username`, message.author)
            .setFooter("Partner Advertised Again Too Early")
            .setTimestamp()
            logchan.send(`<@707891832377573397>`);
            logchan.send(partnerAdvertisedEmbed);
            
        } else {
            partnerAdvertised.add(message.author.id);
            setTimeout(() => {
               partnerAdvertised.delete(message.author.id);
            }, 86400000);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////
   
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);


});
 
client.login(process.env.TOKEN);

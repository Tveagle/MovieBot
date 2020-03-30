const Discord = require('discord.js')
const axios = require('axios')

const bot = new Discord.Client()

//token for logging in the bot
const token = '[DISCORD BOT TOKEN]'//Replace with Discord Bot Token

const prefix = '!'

bot.on('ready', () => {
    console.log('bot is working')
})

bot.on("message", async msg => {

     const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    
    
    const command = args.shift().toLowerCase();

    const combinedArgs = args.join(" ");

    if (!msg.content.startsWith(prefix)){
        return 
    }

    if (command === 'movie'){
        axios({
            "method":"GET",
            "url":"http://www.omdbapi.com/?t="+ combinedArgs + "&apikey=[APIKEY]",//<-API key goes here 
            })
            .then((response)=>{

              //console.log(response)

              if(response.data.Response === "False")
                msg.reply("Could not find a movie with that title, sorry 😥")
            else{
              msg.channel.send(`**__${response.data.Title}__**\n Release Date:\t${response.data.Released}\n Director:\t\t\t${response.data.Director}\n IMDB Rating:\t${response.data.imdbRating}\n Box Office:\t\t${response.data.BoxOffice}\n`, {files: [response.data.Poster]})
            }
            })
            .catch((error)=>{
              console.log(error)
              
            })
    }


});

bot.login(token)
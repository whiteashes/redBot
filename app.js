import redis from 'redis'
import fs from 'fs'
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token,{polling:true});

const subscriber = createClient();
const token = '1609057017:AAGNRt6pIdZ7QHqjhfZMMEdreI1QDLuZjhc';

function createClient() {
    try {
        const sock = process.env.REDIS_SOCK ?? '/usr/local/sock/redis.sock'
        if (fs.existsSync(sock))
            return redis.createClient(sock)
    } catch (err) {
        console.log(err)
    }

    console.log(`creating ${process.env['REDIS_HOST'] || 'localhost'}:6379 client`)
    return redis.createClient(6379, '192.168.46.30')
}


subscriber.on("subscribe", function(channel, count) {
    publisher.publish("a channel", "a message");
    publisher.publish("a channel", "another message");
  });

subscriber.keys('*', (err,keys) => {
    if(err) return console.log(err);

    const len = keys.length;
    for(let i=0;i<len;i++){
        console.log(keys[i]);
    }
});

subscriber.on("message", function(channel, message) {

  console.log("Subscriber received message in channel '" + channel + "': " + message);
  
  bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id,"hi user");
  });

});

subscriber.subscribe("a channel");



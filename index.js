const Botkit = require('Botkit');
const _ = require('underscore');
// const redis = require('redis');
// const client = redis.createClient();
const redisHelper = require('./redis_helper');

const controller = Botkit.slackbot({
    debug: true
});

controller.spawn({
    token: process.env.token
}).startRTM();

//User Specific.
controller.hears('.*',['ambient'], (bot, message) => {
    bot.api.users.info({user: message.user}, (error, response) => {
        const {name, real_name} = response.user;
        // Will add these to redis. 
        const responses = [
            'Yep yep thats right!', 
            'Cool!', 
            'Us RPG guys wish we can be full stack.',
            'Big Data!',
            'I want to learn some Python like Tara at the Orchard.'
        ];
        const names = ['bush', 'seanscottking', 'estreske'];
        if (names.includes(name)) {
            bot.reply(message, _.sample(responses));
        }
        else if (name === 'baz') {
            bot.reply(message, 'Shut up Baz!');
        }
     });
});

controller.hears('.*',['direct_message','direct_mention','mention'], (bot, message) => {
    redisHelper.getList('responses', (err, data) => {
        if (err) {
            bot.reply(message, 'Uh looks like the v7000 is having issues again :(');
        }
        else {
            data = data.map(JSON.parse);
            bot.reply(message, _.sample(data));
        }
    });
});

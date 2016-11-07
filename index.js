const Botkit = require('Botkit');
const _ = require('underscore');

const controller = Botkit.slackbot({
    debug: true
});

controller.spawn({
    token: process.env.token
}).startRTM();

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
        const names = ['dbush', 'seanscottking', 'estreske'];
        if (names.includes(name)) {
            bot.reply(message, _.sample(responses));
        }
        else if (name === 'baz') {
        	bot.reply(message, 'Shut up Baz!');
        }
     });
});
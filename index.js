const Botkit = require('Botkit');

const controller = Botkit.slackbot({
    debug: true
});

controller.spawn({
    token: process.env.token
}).startRTM();

controller.hears('.*',['ambient'], (bot, message) => {
    bot.api.users.info({user: message.user}, (error, response) => {
        let {name, real_name} = response.user;
        if (name === 'gbarnett') {
            bot.reply(message, "Hello " + name);
        }
     });
});
const Botkit = require('botkit');
const _ = require('underscore');
const redisHelper = require('./redis_helper');

const controller = Botkit.slackbot({
    debug: true
});

controller.spawn({
    token: process.env.token
}).startRTM();

//User Specific. Get this working next. 
controller.hears('.*',['ambient'], (bot, message) => {
  bot.api.users.info({user: message.user}, (error, response) => {
    const {name, real_name} = response.user;
    const userResponses = redisHelper.getUser(name, (err, data) => {
      if (err) { 
          bot.reply(message, 'Uh looks like the v7000 is having issues again :('); 
      }
      else if (data && new Date().getMinutes() % 2 == 0) {
          data = JSON.parse(data);
          bot.reply(message, _.sample(data));
      }
    });
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

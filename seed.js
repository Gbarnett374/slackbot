const redisHelper = require('./redis_helper');
const responses = [
  'Yep yep thats right!', 
  'Cool!', 
  'Us RPG guys wish we can be full stack.',
  'Big Data!',
  'I want to learn some Python like Tara at the Orchard.'
];

const data = [
  {
    'user': 'bush',
    'responses': responses

  },
  {
    'user': 'seanscottking',
    'responses': responses
  },
  {
    'user': 'estreske',
    'responses': responses
  },
  {
    'user': 'baz',
    'responses': ['Shut Up Baz!']
  }
];

let processList = (data, key, callback) => {
  data.forEach((response, index) => {
    redisHelper.saveList(response, key, index, (err, index) => {
      if (index === data.length - 1){ 
        console.log(`Finished inserting records for ${key}.`);
        if (callback) return callback();
      }
    });
  });
}

let processHash = (data) => {
  data.forEach((val, index) => {
    redisHelper.saveUserHash(val);
  });
}
processHash(data);
processList(responses, 'responses', () => {
  throw 'Finished.';
});
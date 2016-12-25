const redis  = require('redis');
const client = redis.createClient();
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
	}
];

client.save = (response, key, index, callback) => {
	client.lpush(key, JSON.stringify(response), (error, resp) => {
		if (error) return callback(error);
		console.log(`Inserted record in ${key}.`);
		console.log(resp);
		return callback(null, index);
	});
}

let processList = (data, key, callback) => {
	data.forEach((response, index) => {
		client.save(response, key, index, (err, index) => {
			if (err) console.log(err);
			if (index === data.length - 1){ 
				console.log(`Finished inserting records for ${key}.`);
				if (callback) return callback();
			}
		});
	});
}

let processHash = (data) => {
	data.forEach((val, index) => {
		client.hmset(`users:${val.user}`, "responses", JSON.stringify(val.responses), (err, resp) => {
			console.log(val.user, resp);
		});
	});
}
processHash(data);
processList(responses, 'responses', () => {
	throw 'Finished.';
});
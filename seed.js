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
	client.lpush(key, JSON.stringify(response), (error) => {
		if (error) return callback(error);
		console.log(`Inserted record in ${key}.`);
		return callback(null, index);
	});
}

data.forEach((response, index) => {
	client.save(response, 'user_responses', index, (err, index) => {
		console.log(index);
		if (err) console.log(err);
		if (index === data.length - 1){ 
			console.log('Finished inserting records.');
		}
	});
});

responses.forEach((response, index) => {
	client.save(response, 'responses', index, (err, index) => {
		console.log(index);
		if (err) console.log(err);
		if (index === responses.length - 1){ 
			console.log('Finished inserting records.');
			throw '';
		}
	});
});

const redis  = require('redis');
const client = redis.createClient();

exports.saveList = (response, key, index, callback) => {
	client.lpush(key, JSON.stringify(response), (error, resp) => {
		if (error) return callback(error);
		console.log(`Inserted record in ${key}.`);
		console.log(resp);	
		return callback(null, index);
	});
}

exports.saveUserHash = (val) => {
	client.hmset(`users:${val.user}`, "responses", JSON.stringify(val.responses), (err, resp) => {
			console.log(val.user, resp);
	});
}

exports.getUser = (user) => {
	client.hget(users:${user}`, "responses");
}
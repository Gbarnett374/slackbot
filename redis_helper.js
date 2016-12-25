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

exports.getUser = (user, callback) => {
    client.hget(users:${user}`, "responses", (err, data) => {
        if err return callback(err);
        return callback(null, data);
    });
}

exports.getList = (list, callback) => {
    client.lrange(list, 0, -1, (err, data) => {
        if (err) return callback(err, null);
        data = data.map(JSON.parse);
        return callback(null, data);
    });
}

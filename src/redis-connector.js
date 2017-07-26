const redis = require('redis');
const logger = require('./utils/logger');


const getConnection = function(redisUrl) {
	var client = redis.createClient(redisUrl || '//ec2-34-239-226-130.compute-1.amazonaws.com:6379' || '//127.0.0.1:6379', {
		retry_strategy: function(options) {
			logger.debug('Retry redis connection: ', options.attempt);

			// 5 mins
			if (options.total_retry_time > 1000 * 60 * 5) {
				// End reconnecting after a specific timeout and flush all commands with a individual error
				return logger.error('Redis: maximum retry time exhausted');
			}
			if (options.attempt > 5) {
				// End reconnecting with built in error
				return logger.error('Redis: maximum connection retry reached');
			}
			// reconnect after 1 minute
			return 1000 * 5;
		},
	});
	return client;
};

module.exports = getConnection;

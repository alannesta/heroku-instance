const winston = require('winston');
const os = require('os');
const path = require('path');

const logger = new (winston.Logger)({
	transports: getTransportConfig(process.env.NODE_ENV),
});

function getTransportConfig(env) {
	if (env === 'production') {
		return [
			new (winston.transports.Console)({
				level: 'info',
				handleExceptions: true,
				humanReadableUnhandledException: true,
				stderrLevels: ['error'],	// this will affect pm2 logs on prod
			})
		];
	}

	// local dev settings
	return [
		new (winston.transports.Console)({
			level: 'debug',
			handleExceptions: true,
			humanReadableUnhandledException: true,
			stderrLevels: ['error']
		})
	];
}

module.exports = logger;

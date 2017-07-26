const async = require('async');

const crawlerService = require('./service/crawler-service');
const parserService = require('./service/parser-service');

const logger = require('./utils/logger');

const http = require('http');

const server = http.createServer((req, res) => {
	var parsed = require('url').parse(req.url);
	if (parsed.pathname === '/parse' && parsed.query.indexOf('http') > -1) {
		let process = parserService.spawnPhantomProcess(parsed.query);
		parserService.resolveVideoUrl(process, {}, (err, result) => {
			if (err) {
				// report error
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('failed');
			} else {
				logger.debug('Parse success, publish results: ', result);
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end(result);
			}
		});
	} else {
		res.end('parse stuff');
	}
});

server.listen(process.env.PORT || 8001);


const parserServiceV2 = require('./service/parser-service-v2');

const logger = require('./utils/logger');

const http = require('http');

const server = http.createServer((req, res) => {
	var parsed = require('url').parse(req.url);
	if (parsed.pathname === '/parse' && parsed.query.indexOf('http') > -1) {
		parserServiceV2.parse(parsed.query).then((result) => {
			if(result && result.indexOf('http') > -1) {
				logger.debug('Parse success, publish results: ', result);
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end(result);
			} else {
				logger.error('Not able to get valid url result: ', result);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('parse failed');
			}
		}).catch((err) => {
			logger.error('Parse failed: ', err);
			res.end(err);
		});
	} else {
		logger.debug('Invalid request format(inavlid url path/query');
		res.end('inavlid url path/query');
	}
});

const port = process.env.PORT || 8001;
console.log('start server at ' + port);
server.listen(port);


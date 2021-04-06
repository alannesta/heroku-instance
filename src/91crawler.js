const parserServiceV3 = require('./service/parser-service-v3');
const http = require('http');

const server = http.createServer((req, res) => {
	var parsed = require('url').parse(req.url);
	if (parsed.pathname === '/parse' && parsed.query.indexOf('http') > -1) {
		parserServiceV3.parse(parsed.query).then((result) => {
			if(result && result.indexOf('http') > -1) {
				console.log('Parse success, publish results: ', result);
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end(result);
			} else {
				console.error('Not able to get valid url result: ', result);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('parse failed');
			}
		}).catch((err) => {
			console.error('Parse failed, using placeholder url: ', err);
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('http://placeholderurl.io');
		});
	} else {
		console.log('Invalid request format(inavlid url path/query');
		res.end('inavlid url path/query');
	}
});

const port = process.env.PORT || 8001;
console.log('start server at ' + port);
server.listen(port);


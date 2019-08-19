const resolver = require('91video-resolver');

const Parser = {
	parse: function(url) {
		// return resolver.parse(url);

		return new Promise((resolve, reject) => {
			let j = request.jar();
			let cookie = request.cookie('language=cn_CN');
			j.setCookie(cookie, url);

			request({
				url: url,
				jar: j
			}, (error, response, body) => {
				if (error) {
					reject(error);
				}
				if (!error && response.statusCode === 200) {
					try {
						// 2019.8.18 switch to legacy method since 91 has reverted previous changes
						resolve(extractSrc(body));
					} catch(err) {
						reject(err);
					}
				}
			});
		});
	}
};

function extractSrc(content) {
	const regex = /<source src="(.*?)"/;
	const match = content.match(regex);
	if (match !== null) {
		return match[1];
	}
	throw new Error('could not extract url via <source src=, please check page encoding')
}

module.exports = Parser;
const request = require('request');
const utils = require('../utils/service-util');

const Parser = {
	parse: function(url) {
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
					resolve(utils.extractHtml5Video(body));
				}
			});
		});
	}
};

module.exports = Parser;
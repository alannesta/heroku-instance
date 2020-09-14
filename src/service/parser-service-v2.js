const resolver = require('91video-resolver');

const Parser = {
    parse: function(url) {
        return resolver.parse(url);
    }
};


module.exports = Parser;
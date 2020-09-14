const resolver = require('91video-resolver');

const Parser = {
    parse: function(url) {
        return resolver.parse(url).catch((err) => {
            console.log(err);
            throw err;
        });
    }
};



module.exports = Parser;
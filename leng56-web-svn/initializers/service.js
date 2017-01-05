var path  = require('path');
var fs  = require('fs');

module.exports = {

    initialize: function(api, next){
        api.services = {
            load: function(callback) {
                try {
                    var dir = path.normalize(api.projectRoot + '/services');
                    fs.readdirSync(dir).forEach(function(file){
                        if (path.extname(file).toLowerCase() === '.js') {
                            var nameParts = file.split("/");
                            var name = nameParts[(nameParts.length - 1)].split(".")[0];
                            api.services[name] = require(dir + '/' + name);
                            api.log('load service: ' + name, 'debug');
                        }
                    });
                    callback();
                } catch (err) {
                    callback(err);

                }
            }
        };
        next();
    },

    start: function(api, next){
        api.services.load(next);
    }
};

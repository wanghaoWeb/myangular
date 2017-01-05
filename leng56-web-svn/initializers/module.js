var path = require('path');
var fs = require('fs');

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,

    initialize: function (api, next) {
        api.appModules = {};
        var appLocalPath = api.projectRoot + '/public/app/modules';
        var appWebPath = 'app/modules';
        fs.readdirSync(path.normalize(appLocalPath)).forEach(function (moduleName) {
            var moduleLocalPath = path.normalize(appLocalPath + '/' + moduleName);
            var stats = fs.statSync(moduleLocalPath);
            if (stats.isDirectory()) {
                var moduleJsFiles = api.appModules[moduleName] = [];
                fs.readdirSync(moduleLocalPath).forEach(function (appModuleFile) {
                    if (path.extname(appModuleFile).toLowerCase() === '.js') {
                        moduleJsFiles.push(appWebPath + '/' + moduleName + '/' + appModuleFile);
                    }
                });
            }
        });

        next();
    },

    start: function (api, next) {
        next();
    },

    stop: function (api, next) {
        next();
    }
};



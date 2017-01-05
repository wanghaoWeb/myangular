var path = require('path');
var fs = require('fs');
var Sequelize = require('sequelize');

module.exports = {
    loadPriority: 100,
    startPriority: 100,

    initialize: function (api, next) {
        api.models = {};

        var sequelizeInstance = new Sequelize(
            api.config.sequelize.database,
            api.config.sequelize.username,
            api.config.sequelize.password,
            api.config.sequelize
        );

        api.sequelize = {

            sequelize: sequelizeInstance,

            connect: function (callback) {
                var dir = path.normalize(api.projectRoot + '/models');
                fs.readdirSync(dir).forEach(function (file) {
                    if (path.extname(file).toLowerCase() === '.js') {
                        var nameParts = file.split("/");
                        var name = nameParts[(nameParts.length - 1)].split(".")[0];
                        api.models[name] = api.sequelize.sequelize.import(dir + '/' + file);
                    }

                });

                Object.keys(api.models).forEach(function(modelName) {
                    if ("associate" in api.models[modelName]) {
                        api.models[modelName].associate(api.models);
                    }
                });


                api.sequelize.sequelize.sync().then(function () {
                    callback();
                }).catch(function (error) {
                    callback(error);
                });
            },

            extends: function (child, parent) {
                if (parent) {
                    for (var property in parent) {
                        child[property] = parent[property];
                    }
                }

                return child;
            },

            findOne: function (sql, params, options) {
                var defaultOptions = {
                    replacements: params,
                    type: api.sequelize.sequelize.QueryTypes.SELECT,
                    raw: true,
                    plain: true,
                    logging: console.log
                };

                api.sequelize.extends(defaultOptions, options);

                return api.sequelize.sequelize.query(sql, defaultOptions);
            },

            findAll: function (sql, params, options) {
                var defaultOptions = {
                    replacements: params,
                    type: api.sequelize.sequelize.QueryTypes.SELECT,
                    raw: true,
                    logging: console.log
                };

                api.sequelize.extends(defaultOptions, options);

                return api.sequelize.sequelize.query(sql, defaultOptions);
            },

            findValue: function (sql, params) {
                var defaultOptions = {
                    replacements: params,
                    type: api.sequelize.sequelize.QueryTypes.SELECT,
                    raw: true,
                    plain: true,
                    logging: console.log
                };

                api.sequelize.extends(defaultOptions, options);

                return api.sequelize.sequelize.query(sql, defaultOptions).then(function (result) {
                    for (var p in result) {
                        return result[p];
                    }

                    return null;
                });
            }
        };

        next();
    },

    start: function (api, next) {
        api.sequelize.connect(next);
    }
};

exports.default = {
    sequelize: function (api) {
        return {
            "autoMigrate": false,
            "loadFixtures": false,
            "dialect": "mysql",
            "timezone": '+08:00',
            "port": 3306,
            "database": 'leng56v2',
            "host": '10.10.9.98',
            "username": 'root',
            "password": '123456',
            "logging": true
        };
    }
};

exports.test = {
    sequelize: function (api) {
        return {
            "autoMigrate": false,
            "loadFixtures": false,
            "dialect": "mysql",
            "timezone": '+08:00',
            "port": 3306,
            "database": 'actionhero_test',
            "host": '127.0.0.1',
            "username": 'root',
            "password": null,
            "logging": false
        };
    }
};

exports.development = exports.default.sequelize();

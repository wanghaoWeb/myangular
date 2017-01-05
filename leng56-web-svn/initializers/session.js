var crypto = require('crypto');

module.exports = {
    initialize: function (api, next) {

        var redis = api.redis.clients.client;

        api.session = {
            prefix: 'session:', ttl: 60 * 60 * 24, // 1 day

            load: function (connection, callback) {
                var key = api.session.prefix + connection.fingerprint;
                redis.get(key, function (error, data) {
                    if (error) {
                        return callback(error);
                    } else if (data) {
                        return callback(null, JSON.parse(data));
                    } else {
                        return callback(null, false);
                    }
                });
            },

            create: function (connection, user, callback) {
                var key = api.session.prefix + connection.fingerprint;

                crypto.randomBytes(64, function (ex, buf) {
                    var csrfToken = buf.toString('hex');

                    var sessionData = {
                        userId: user.id,
                        csrfToken: csrfToken,
                        sesionCreatedAt: new Date().getTime(),
                        organizationId: user.organizationId,
                        seatGroupId: user.seatGroupId
                    };
                    var roles = {};
                    if (user.roles) {
                        user.roles.forEach(function (role) {
                            roles[role.id] = true;
                        });
                    }
                    sessionData.roles = roles;

                    redis.set(key, JSON.stringify(sessionData), function (error, data) {
                        if (error) {
                            return callback(error);
                        }
                        redis.expire(key, api.session.ttl, function (error) {
                            callback(error, sessionData);
                        });
                    });
                });
            },

            destroy: function (connection, callback) {
                var key = api.session.prefix + connection.fingerprint;
                redis.del(key, callback);
            },

            middleware: {
                'logged-in-session': {
                    name: 'logged-in-session', global: false, priority: 1100, preProcessor: function (data, callback) {
                        api.session.load(data.connection, function (error, sessionData) {
                            if (error) {
                                return callback(error);
                            } else if (!sessionData) {
                                if (data.connection.type === 'web') {
                                    data.connection.rawConnection.responseHttpCode = 401;
                                }

                                return callback(new Error(api.services.Constants.ERROR_CODE.NO_LOGIN_IN));
                            } else {
                                var csrfToken = getCSRFToken(data);

                                if (!csrfToken || csrfToken != sessionData.csrfToken) {
                                    if (data.connection.type === 'web') {
                                        data.connection.rawConnection.responseHttpCode = 401;
                                    }
                                    return callback(new Error(api.services.Constants.ERROR_CODE.CSRF_ERROR));
                                } else {
                                    data.session = sessionData;
                                    var key = api.session.prefix + data.connection.fingerprint;
                                    redis.expire(key, api.session.ttl, callback);
                                }
                            }
                        });
                    }
                }
            }
        };

        api.actions.addMiddleware(api.session.middleware['logged-in-session']);

        api.params.globalSafeParams.push('csrfToken');

        next();
    },

    start: function (api, next) {
        next();
    },

    stop: function (api, next) {
        next();
    }
};

function getCSRFToken(data) {
    var csrfToken = data.params.csrfToken;

    if (!csrfToken && data.connection.type === 'web') {
        csrfToken = data.connection.rawConnection.req.headers.csrftoken || data.connection.rawConnection.req.headers.csrfToken;

        if (!csrfToken && data.connection.rawConnection.cookies) {
            csrfToken = data.connection.rawConnection.cookies.csrfToken;
        }
    }

    return csrfToken;
}

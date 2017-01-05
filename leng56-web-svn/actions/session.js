exports.sessionCreate = {
    name: 'session:create',
    description: 'session:create',
    outputExample: {},

    inputs: {
        loginName: {required: true},
        password: {required: true},
    },

    run: function (api, data, next) {
        data.response.success = false;

        api.services.user.login(api, data.params).then(function (user) {
            api.session.create(data.connection, user, function (error, sessionData) {
                if (error) {
                    return next(error);
                }

                setCSRFToken(api, data, sessionData.csrfToken);

                data.response.success = true;
                next();
            });
        }).catch(next);
    }
};

function setCSRFToken (api, data, csrfToken) {
    // 设置CSRF-TOKEN到cookie
    if (data.connection.type === 'web') {
        var options = api.config.servers.web.fingerprintOptions;
        if(options.toSetCookie == true){
            if (options.settings != undefined) {
                var settings = options.settings;
                var settingsParams = '';
                if(typeof(settings) == 'object') {
                    for (var key in settings) {
                        if (settings.hasOwnProperty(key)) {
                            var value = settings[key];
                            if(key === 'expires') {
                                value = new Date(new Date().getTime() + settings[key]).toUTCString();
                            }
                            settingsParams = settingsParams + key + '=' + value + ';';
                        }
                    }
                } else {
                    settingsParams = settings;
                }
                data.connection.rawConnection.responseHeaders.push(['Set-Cookie', 'csrfToken=' + csrfToken + ';' + settingsParams]);
            } else {
                data.connection.rawConnection.responseHeaders.push(['Set-Cookie', 'csrfToken=' + csrfToken]);
            }

        }

    }

    data.response.sessionid = data.connection.fingerprint;
    data.response.csrfToken = csrfToken;
}

exports.sessionDestroy = {
    name: 'session:destroy',
    description: 'session:destroy',
    outputExample: {},

    inputs: {},

    run: function (api, data, next) {
        data.response.success = false;
        api.session.destroy(data.connection, next);
    }
};

exports.sessionCheck = {
    name: 'session:check',
    description: 'session:check',
    outputExample: {},

    inputs: {},

    run: function (api, data, next) {
        api.session.load(data.connection, function (error, sessionData) {
            if (error) {
                return next(error);
            }
            else if (!sessionData) {
                return next(new Error(api.services.Constants.ERROR_CODE.NO_LOGIN_IN));
            } else {
                api.services.user.findById(api, sessionData.userId).then(function (user) {
                    if (!user) {
                        return next(new Error(api.services.Constants.ERROR_MESSAGE.USER_NOT_FOUND));
                    }
                    data.response.user = user.apiData(api);
                    data.response.csrfToken = sessionData.csrfToken;
                    data.response.success = true;
                    next();
                }).catch(next);
            }
        });
    }
};

exports.sessionWSAuthenticate = {
    name: 'session:wsAuthenticate',
    description: 'session:wsAuthenticate',
    outputExample: {},
    blockedConnectionTypes: ['web'],

    inputs: {},

    run: function (api, data, next) {
        api.session.load(data.connection, function (error, sessionData) {
            if (error) {
                return next(error);
            }
            else if (!sessionData) {
                return next(new Error(api.services.Constants.ERROR_CODE.NO_LOGIN_IN));
            } else {
                data.connection.authorized = true;
                data.response.authorized = true;
                next();
            }
        });
    }
};

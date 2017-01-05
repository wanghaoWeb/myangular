exports.next = {
    name: 'identifier:next',
    description: '获得下一个id',
    outputExample: {},
    middleware: [],

    run: function (api, data, next) {
        api.services.identifier.next(api).then(function (value) {
            data.response.result = value;
            next();
        }).catch(next);
    }
};

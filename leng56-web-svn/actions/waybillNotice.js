/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillNoticeCreate = {
    name: 'waybillNotice-management:create',
    description: 'waybillNotice-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        messageType: {required: true},
        content: {required: false},
    },

    run: function (api, data, next) {
        api.services.waybillNotice.create(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillNoticeView = {
    name: 'waybillNotice-management:view',
    description: 'waybillNotice-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillNotice.findById(api, data.params.id).then(function (result) {
            if (!user) {
                next(new Error('waybillNotice not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.waybillNoticeEdit = {
    name: 'waybillNotice-management:edit',
    description: 'waybillNotice-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        waybillId: {required: true},
        messageType: {required: false},
        content: {required: false},
    },

    run: function (api, data, next) {
        api.services.waybillNotice.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillNoticeList = {
    name: 'waybillNotice-management:list',
    description: 'waybillNotice-management:list',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        where: {
            required: false,
            formatter: function(param, connection, actionTemplate){
                return JSON.parse(param);
            }
        },
        page: {
            required: false,
            formatter: function(param, connection, actionTemplate){
                return parseInt(param);
            },
            default: function(param, connection, actionTemplate){
                return 0;
            }
        },
        size: {
            required: false,
            formatter: function(param, connection, actionTemplate){
                return parseInt(param);
            },
            default: function(param, connection, actionTemplate){
                return 20;
            }
        },
        sort: {
            required: false,
            formatter: function(param, connection, actionTemplate){
                return utils.generateSort(param);
            }
        }
    },

    run: function (api, data, next) {
        api.services.waybillNotice.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.waybillNoticeDelete = {
    name: 'waybillNotice-management:delete',
    description: 'waybillNotice-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillNotice.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillEventCreate = {
    name: 'waybillEvent-management:create',
    description: 'waybillEvent-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        event: {required: false},
        creatorId:{required:false}
    },

    run: function (api, data, next) {
        api.services.waybillEvent.create(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillEventView = {
    name: 'waybillEvent-management:view',
    description: 'waybillEvent-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillEvent.findById(api, data.params.id).then(function (result) {
            if (!user) {
                next(new Error('waybillEvent not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.waybillEventEdit = {
    name: 'waybillEvent-management:edit',
    description: 'waybillEvent-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        waybillId: {required: true},
        event: {required: false},
        creatorId:{required:false}
    },

    run: function (api, data, next) {
        api.services.waybillEvent.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillEventList = {
    name: 'waybillEvent-management:list',
    description: 'waybillEvent-management:list',
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
        api.services.waybillEvent.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.waybillEventDelete = {
    name: 'waybillEvent-management:delete',
    description: 'waybillEvent-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillEvent.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



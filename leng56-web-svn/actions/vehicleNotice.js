/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.vehicleNoticeCreate = {
    name: 'vehicleNotice-management:create',
    description: 'vehicleNotice-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        vehicleId: {required: false},
        messageType: {required: false},
        content: {required: false}
    },

    run: function (api, data, next) {
        api.services.vehicleNotice.create(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.vehicleNoticeView = {
    name: 'vehicleNotice-management:view',
    description: 'vehicleNotice-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.vehicleNotice.findById(api, data.params.id).then(function (result) {
            if (!user) {
                next(new Error('vehicleNotice not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.vehicleDrivingLicenseEdit = {
    name: 'vehicleNotice-management:edit',
    description: 'vehicleNotice-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        vehicleId: {required: true},
        messageType: {required: false},
        content: {required: false}
    },

    run: function (api, data, next) {
        api.services.vehicleNotice.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.vehicleNoticeList = {
    name: 'vehicleNotice-management:list',
    description: 'vehicleNotice-management:list',
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
        api.services.vehicleNotice.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.vehicleNoticeDelete = {
    name: 'vehicleNotice-management:delete',
    description: 'vehicleNotice-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.vehicleNotice.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



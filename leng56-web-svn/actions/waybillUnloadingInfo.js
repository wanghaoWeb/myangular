/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillUnloadingInfoCreate = {
    name: 'waybillUnloadingInfo-management:create',
    description: 'waybillUnloadingInfo-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        taskUnloadingInfoId: {required: true},
        amount: {required: false},
        amountUnit:{required:false},
    },

    run: function (api, data, next) {
        api.services.waybillUnloadingInfo.create(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillUnloadingInfoView = {
    name: 'waybillUnloadingInfo-management:view',
    description: 'waybillUnloadingInfo-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillUnloadingInfo.findById(api, data.params.id).then(function (result) {
            if (!user) {
                next(new Error('waybillUnloadingInfo not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.waybillUnloadingInfoEdit = {
    name: 'waybillUnloadingInfo-management:edit',
    description: 'waybillUnloadingInfo-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        waybillId: {required: true},
        taskUnloadingInfoId: {required: true},
        amount: {required: false},
        amountUnit:{required:false},
    },

    run: function (api, data, next) {
        api.services.waybillUnloadingInfo.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillUnloadingInfoList = {
    name: 'waybillUnloadingInfo-management:list',
    description: 'waybillUnloadingInfo-management:list',
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
        api.services.waybillUnloadingInfo.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.waybillUnloadingInfoDelete = {
    name: 'waybillUnloadingInfo-management:delete',
    description: 'waybillUnloadingInfo-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillUnloadingInfo.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



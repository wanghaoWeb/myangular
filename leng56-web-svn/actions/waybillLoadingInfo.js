/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillLoadingInfoCreate = {
    name: 'waybillLoadingInfo-management:create',
    description: 'waybillLoadingInfo-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        taskLoadingInfoId: {required: true},
        amount: {required: false},
        amountUnit:{required:false},
    },

    run: function (api, data, next) {
        api.services.waybillLoadingInfo.create(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillLoadingInfoView = {
    name: 'waybillLoadingInfo-management:view',
    description: 'waybillLoadingInfo-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillLoadingInfo.findById(api, data.params.id).then(function (result) {
            if (!user) {
                next(new Error('waybillLoadingInfo not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.waybillLoadingInfoEdit = {
    name: 'waybillLoadingInfo-management:edit',
    description: 'waybillLoadingInfo-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        waybillId: {required: true},
        taskLoadingInfoId: {required: true},
        amount: {required: false},
        amountUnit:{required:false},
    },

    run: function (api, data, next) {
        api.services.waybillLoadingInfo.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillLoadingInfoList = {
    name: 'waybillLoadingInfo-management:list',
    description: 'waybillLoadingInfo-management:list',
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
        api.services.waybillLoadingInfo.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.waybillLoadingInfoDelete = {
    name: 'waybillLoadingInfo-management:delete',
    description: 'waybillLoadingInfo-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillLoadingInfo.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



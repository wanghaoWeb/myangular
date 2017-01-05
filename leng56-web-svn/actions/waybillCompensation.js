/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillCompensationCreate = {
    name: 'waybillCompensation-management:compensation',
    description: '理赔申请',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        amount: {required: true},
        type: {required: true},
        reason:{required:true},
        status: {required: false},
        current: {required: false},
        creatorId:{required:false},
        remark: {required: false}
    },

    run: function (api, data, next) {
        data.params.creatorId=data.session.userId;
        api.services.waybillCompensation.create(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.waybillCompensationView = {
    name: 'waybillCompensation-management:view',
    description: 'waybillCompensation-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillCompensation.findById(api, data.params.waybillId).then(function (result) {
            if (!result) {
                //next(new Error('waybillCompensation not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

exports.waybillCompensationEdit = {
    name: 'waybillCompensation-management:edit',
    description: 'waybillCompensation-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        waybillId: {required: true},
        amount: {required: true},
        type: {required: false},
        reason:{required:false},
        status: {required: false},
        current: {required: false},
        creatorId:{required:false},
        remark: {required: false}
    },

    run: function (api, data, next) {
        api.services.waybillCompensation.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.waybillCompensationList = {
    name: 'waybillCompensation-management:list',
    description: 'waybillCompensation-management:list',
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
        api.services.waybillCompensation.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.waybillCompensationDelete = {
    name: 'waybillCompensation-management:delete',
    description: 'waybillCompensation-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillCompensation.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



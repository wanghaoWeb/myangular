/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillPaymentPayment = {
    name: 'waybillPayment-management:payment',
    description: '付款申请',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        amount: {required: true},
        paymentTime: {required: false},
        paymentType:{required:false},
        reason: {required: false},
        //remark: {required: false},
        //status:{required:false},
        creatorId:{required:false}
    },

    run: function (api, data, next) {
        data.params.creatorId=data.session.userId;
        api.services.waybillPayment.create(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.waybillPaymentView = {
    name: 'waybillPayment-management:view',
    description: 'waybillPayment-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {
            required: true
        }
    },
    run: function (api, data, next) {
        api.services.waybillPayment.findById(api, data.params.waybillId).then(function (result) {
            if (!result) {
                next(new Error('waybillPayment not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

exports.waybillPaymentEdit = {
    name: 'waybillPayment-management:paymentEdit',
    description: 'waybillPayment-management:paymentEdit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        waybillId: {required: true},
        amount: {required: true},
        paymentTime: {required: false},
        paymentType:{required:false},
        reason: {required: false},
        //remark: {required: false},
        //status:{required:false},
        creatorId:{required:false}
    },

    run: function (api, data, next) {
        data.params.creatorId=data.session.userId;
        api.services.waybillPayment.update(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};
//
//exports.waybillPaymentList = {
//    name: 'waybillPayment-management:list',
//    description: 'waybillPayment-management:list',
//    outputExamples: {},
//    middleware: ['logged-in-session'],
//
//    inputs: {
//        where: {
//            required: false,
//            formatter: function(param, connection, actionTemplate){
//                return JSON.parse(param);
//            }
//        },
//        page: {
//            required: false,
//            formatter: function(param, connection, actionTemplate){
//                return parseInt(param);
//            },
//            default: function(param, connection, actionTemplate){
//                return 0;
//            }
//        },
//        size: {
//            required: false,
//            formatter: function(param, connection, actionTemplate){
//                return parseInt(param);
//            },
//            default: function(param, connection, actionTemplate){
//                return 20;
//            }
//        },
//        sort: {
//            required: false,
//            formatter: function(param, connection, actionTemplate){
//                return utils.generateSort(param);
//            }
//        }
//    },
//
//    run: function (api, data, next) {
//        api.services.waybillCompensation.findAndCountAll(api, data.params).then(function(result) {
//            data.response.result = result.rows;
//            data.response.count = result.count;
//            next();
//        }).catch(next);
//    }
//};
//
//exports.waybillPaymentDelete = {
//    name: 'waybillPayment-management:delete',
//    description: 'waybillPayment-management:delete',
//    outputExamples: {},
//    middleware: ['logged-in-session'],
//
//    inputs: {
//        id: {
//            required: true
//        }
//    },
//
//    run: function (api, data, next) {
//        api.services.waybillPayment.delete(api, data.params).then(function(result) {
//            data.response.result = result.result;
//            next();
//        }).catch(next);
//    }
//};



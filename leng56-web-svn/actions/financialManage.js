/**
 * Created by Administrator on 2016/12/20.
 */
var utils = require('../services/utils');

exports.financialList = {
    name: 'financial-management:list',
    description: '财务预付款申请列表',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        where: {
            required: false,
            formatter: function (param, connection, actionTemplate) {
                return JSON.parse(param);
            }
        },
        page: {
            required: false,
            formatter: function (param, connection, actionTemplate) {
                return parseInt(param);
            },
            default: function (param, connection, actionTemplate) {
                return 0;
            }
        },
        size: {
            required: false,
            formatter: function (param, connection, actionTemplate) {
                return parseInt(param);
            },
            default: function (param, connection, actionTemplate) {
                return 20;
            }
        },
        sort: {
            required: false,
            formatter: function (param, connection, actionTemplate) {
                return utils.generateSort(param);
            }
        }
    },

    run: function (api, data, next) {
        api.services.waybillPayment.findAndCountAll(api, data.params).then(function (result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};


exports.financialEdit = {
    name: 'financial-management:edit',
    description: '运单预付款申请',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        status:{required:false},

    },

    run: function (api, data, next) {
        data.params.status = 'CONFIRMED';
        api.services.waybillPayment.update(api, data.params).then(function (waybillPayment) {
            data.response.success = true;
            data.response.message = "已确认预付款申请！";
            next();
        }).catch(next);
    }
};


exports.financialView = {
    name: 'financial-management:view',
    description: '运单预付款查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillPayment.findById(api, data.params.id).then(function (result) {

            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result;
                next();
            }

        }).catch(next);
    }
};

/**
 * Created by Administrator on 2016/12/22.
 */
var utils = require('../services/utils');

exports.waybillSettlement = {
    name: 'waybillSettlement-management:settlement',
    description: '运单结算',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId:{required: true},
        amount:{required: true},
        compensationAmount:{required: false},
        prepaymentAmount:{required:false},
        status:{required:false},
        current:{required: false},
        creatorId:{required:false},
        waybillSettlementDetail:{required:false},
    },

    run: function (api, data, next) {
        data.params.creatorId=data.session.userId;
        data.params.status='UNCHECKED';
        api.services.waybillSettlement.create(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};



exports.waybillSettlementList = {
    name: 'waybillSettlement-management:list',
    description: '结算申请列表',
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
        api.services.waybillSettlement.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

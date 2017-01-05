/**
 * Created by Administrator on 2016/12/16.
 */
var utils = require('../services/utils');

exports.waybillTermination = {
    name: 'waybillTermination-management:termination',
    description: '运单终止',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {required: true},
        amount: {required: false},
        type: {required: false},
        reason:{required:false},
        status: {required:false},
        current: {required: false},
        creatorId:{required:false},
        remark:{required:false},
        waybill:{required:false}
    },

    run: function (api, data, next) {
        data.params.creatorId=data.session.userId;
        api.services.waybillTermination.create(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};




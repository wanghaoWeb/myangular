/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.waybillAckImgUpload = {
    name: 'waybillAckImg-management:upload',
    description: '上传回单',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId:{required:true},
        img: {required: true},
        remark: {required: false},
    },

    run: function (api, data, next) {
        api.services.waybillAckImg.create(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.waybillAckImgView = {
    name: 'waybillAckImg-management:view',
    description: '查看回单',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybillAckImg.findById(api, data.params.waybillId).then(function (result) {
            if (!result) {
                next(new Error('waybill not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

//exports.waybillAckImgEdit = {
//    name: 'waybillAckImg-management:edit',
//    description: 'waybillAckImg-management:edit',
//    outputExample: {},
//    middleware: ['logged-in-session'],
//
//    inputs: {
//        id: {required: true},
//        waybillId: {required: true},
//        image: {required: false},
//        remark: {required: false}
//    },
//
//    run: function (api, data, next) {
//        api.services.waybillAckImg.update(api, data.params).then(function (result) {
//            data.response.result = result.apiData(api);
//            next();
//        }).catch(next);
//    }
//};
//
//exports.waybillAckImgList = {
//    name: 'waybillAckImg-management:list',
//    description: 'waybillAckImg-management:list',
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
//        api.services.waybillAckImg.findAndCountAll(api, data.params).then(function(result) {
//            data.response.result = result.rows;
//            data.response.count = result.count;
//            next();
//        }).catch(next);
//    }
//};
//
//exports.waybillAckImgDelete = {
//    name: 'waybillAckImg-management:delete',
//    description: 'waybillAckImg-management:delete',
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
//        api.services.waybillAckImg.delete(api, data.params).then(function(result) {
//            data.response.result = result.result;
//            next();
//        }).catch(next);
//    }
//};
//


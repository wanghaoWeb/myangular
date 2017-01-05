/**
 * Created by Administrator on 2016/12/7.
 */
var utils = require('../services/utils');

exports.taskOfferCreate = {
    name: 'taskOffer-management:create',
    description: '创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        taskId: {required: true},
        organizationId:{required: true},
        seatGroupId:{required: true},
        offer:{required: true},
        type:{required: true},
        accepted:{required: true},
        creatorId:{required: true}

    },

    run: function (api, data, next) {
        api.services.taskOffer.create(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "添加成功";
            next();
        }).catch(next);
    }
};

exports.taskOfferView = {
    name: 'taskOffer-management:view',
    description: '查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.taskOffer.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.taskOfferEdit = {
    name: 'taskOffer-management:edit',
    description: '修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        taskId: {required: true},
        organizationId:{required: true},
        seatGroupId:{required: true},
        offer:{required: true},
        type:{required: true},
        accepted:{required: true},
        creatorId:{required: true}
    },

    run: function (api, data, next) {
        api.services.taskOffer.update(api, data.params).then(function (taskOffer) {
            //data.response.taskOffer = taskOffer.apiData(api);
            data.response.success = true;
            data.response.message = "修改成功";
            next();
        }).catch(next);
    }
};
exports.taskOfferList = {
    name: 'taskOffer-management:list',
    description: '列表',
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
        api.services.taskOffer.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteTaskOffer = {
    name: 'taskOffer-management:delete',
    description: '删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.taskOffer.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "删除成功";
            next();
        }).catch(next);
    }
};

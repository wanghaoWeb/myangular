/**
 * Created by Administrator on 2016/12/7.
 */
/**
 * Created by Administrator on 2016/12/7.
 */
var utils = require('../services/utils');

exports.taskDispatchCreate = {
    name: 'taskDispatch-management:create',
    description: '创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        taskId: {required: true},
        offer:{required: false},
        type:{required: true},
        vehicleIds:{required:true},
        loadingInfoList:{required:true},
        unloadingInfoList:{required:true}
    },

    run: function (api, data, next) {
        data.params.creatorId = data.session.userId;
        api.services.taskDispatch.create(api, data.params).then(function (result) {
            data.response.success = true;
            data.response.result = result;;
            next();
        }).catch(next);
    }
};

exports.taskDispatchView = {
    name: 'taskDispatch-management:view',
    description: '查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.taskDispatch.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.taskDispatchEdit = {
    name: 'taskDispatch-management:edit',
    description: '修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        offer: {required: true},
    },

    run: function (api, data, next) {
        api.services.taskDispatch.update(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "修改成功";
            next();
        }).catch(next);
    }
};
exports.taskDispatchList = {
    name: 'taskDispatch-management:list',
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
        api.services.taskDispatch.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteTaskDispatch = {
    name: 'taskDispatch-management:delete',
    description: '删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.taskDispatch.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "删除成功";
            next();
        }).catch(next);
    }
};

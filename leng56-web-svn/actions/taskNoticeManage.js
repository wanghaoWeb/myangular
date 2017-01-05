/**
 * Created by Administrator on 2016/12/7.
 */

var utils = require('../services/utils');

exports.taskNoticeCreate = {
    name: 'taskNotice-management:create',
    description: '创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        taskId: {required: true},
        messageType:{required: true},
        content:{required: true}
    },

    run: function (api, data, next) {
        api.services.taskNotice.create(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "添加成功";
            next();
        }).catch(next);
    }
};

exports.taskNoticeView = {
    name: 'taskNotice-management:view',
    description: '查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.taskNotice.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.taskNoticeEdit = {
    name: 'taskNotice-management:edit',
    description: '修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        taskId: {required: true},
        messageType:{required: true},
        content:{required: true}
    },

    run: function (api, data, next) {
        api.services.taskNotice.update(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "修改成功";
            next();
        }).catch(next);
    }
};
exports.taskNoticeList = {
    name: 'taskNotice-management:list',
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
        api.services.taskNotice.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteTaskNotice = {
    name: 'taskNotice-management:delete',
    description: '删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.taskNotice.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "删除成功";
            next();
        }).catch(next);
    }
};

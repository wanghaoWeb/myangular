/**
 * Created by Administrator on 2016/12/7.
 */
var utils = require('../services/utils');

exports.taskCreate = {
    name: 'task-management:create',
    description: '货单创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        code: {required: false},
        sourceType:{required: true},
        ownerOrganizationId:{required: false},
        ownerUserId:{required: false},
        customerId:{required:true},
        linkman:{required: true},
        phone:{required: true},
        name:{required: true},
        amountUnit:{required: false},
        worth:{required: true},
        pricing:{required: true},
        package:{required: true},
        tempCtrlType:{required: true},
        lowestTemp:{required: true},
        highestTemp:{required: true},
        status:{required: false},
        remark:{required: false},
        loadingInfo:{required:true},
        unloadingInfo:{required:true},
        worthUnit:{required:true}
    },

    run: function (api, data, next) {
        data.params.organizationId = data.session.organizationId;
        data.params.seatGroupId = data.session.seatGroupId;
        data.params.creatorId = data.session.userId;
        api.services.identifier.next(api).then(function (value) {
            data.params.code = value;
            api.services.task.create(api, data.params).then(function (result) {
                data.response.success = true;
                data.response.message = "货单添加成功";
                next();
            }).catch(next);
        }).catch(next);


    }
};

exports.taskView = {
    name: 'task-management:view',
    description: '货单查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.task.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

exports.taskEdit = {
    name: 'task-management:edit',
    description: '货单修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        code: {required: false},
        sourceType:{required: true},
        ownerOrganizationId:{required: false},
        ownerUserId:{required: false},
        customerId:{required:true},
        linkman:{required: true},
        phone:{required: true},
        name:{required: true},
        amountUnit:{required: false},
        worth:{required: true},
        pricing:{required: true},
        package:{required: true},
        tempCtrlType:{required: true},
        lowestTemp:{required: true},
        highestTemp:{required: true},
        status:{required: false},
        remark:{required: false},
        loadingInfo:{required:true},
        unloadingInfo:{required:true},
        worthUnit:{required:true}
    },

    run: function (api, data, next) {
        data.params.organizationId = data.session.organizationId;
        data.params.seatGroupId = data.session.seatGroupId;
        api.services.task.update(api, data.params).then(function (result) {
            data.response.success = true;
            data.response.message = "货单修改成功";
            next();
        }).catch(next);
    }
};
exports.taskList = {
    name: 'task-management:list',
    description: '货单列表',
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
        if (!data.params.where) {
            data.params.where = {};
        }

        data.params.where.organizationId = data.session.organizationId;
        data.params.where.seatGroupId = data.session.seatGroupId;
        api.services.task.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteTask = {
    name: 'task-management:delete',
    description: '货单删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.task.delete(api, data.params.id).then(function(result) {
            data.response.result = result.result;
            data.response.success = true;
            data.response.message = "货单删除成功";
            next();
        }).catch(next);
    }
};

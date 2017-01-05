/**
 * Created by Administrator on 2016/12/7.
 */
var utils = require('../services/utils');

exports.terminalTypeCreate = {
    name: 'terminalType-management:create',
    description: '创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        desc:{required: true},
        seq:{required: true},

    },

    run: function (api, data, next) {
        api.services.terminalType.create(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "添加成功";
            next();
        }).catch(next);
    }
};

exports.terminalTypeView = {
    name: 'terminalType-management:view',
    description: '查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.terminalType.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.terminalTypeEdit = {
    name: 'terminalType-management:edit',
    description: '修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name:{required:true},
        desc: {required: true},
        seq:{required: true}
    },

    run: function (api, data, next) {
        api.services.terminalType.update(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "修改成功";
            next();
        }).catch(next);
    }
};
exports.terminalTypeList = {
    name: 'terminalType-management:all',
    description: '所有终端类型',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {},

    run: function (api, data, next) {
        api.services.terminalType.findAll(api, data.params).then(function(result) {
            data.response.result = result
            next();
        }).catch(next);
    }
};

exports.deleteTerminalType = {
    name: 'terminalType-management:delete',
    description: '删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.terminalType.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "删除成功";
            next();
        }).catch(next);
    }
};

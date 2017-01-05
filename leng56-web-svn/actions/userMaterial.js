var utils = require('../services/utils');

/**
 * 查询用户的材料提交情况
 */
exports.getAllByUserId = {
    name: 'user-material:byUserId',
    description: '查询用户的材料提交情况',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        userId: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.userMaterial.findAllByUserId(api, data.params.userId).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

/**
 * 保存用户材料信息
 */
exports.save = {
    name: 'user-material:save',
    description: '保存用户材料',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        userId: {
            required: true
        },
        materialId: {
            required: true
        },
        params: {
            required: false,
            formatter: function(param){
                return JSON.parse(param);
            }
        },
        desc: {
            required: false
        }
    },

    run: function (api, data, next) {
        api.services.userMaterial.save(api, data.params).then(function (result) {
            data.response.result = result;
            data.response.success = true;
            data.response.message = '保存成功';
            next();
        }).catch(next);
    }
};

/**
 * 查询用户材料列表
 */
exports.list = {
    name: 'user-material:list',
    description: '用户材料列表',
    outputExample: {},
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
        api.services.userMaterial.findAll(api, data.params).then(function (result) {
            data.response.count = result.count;
            data.response.result = result.rows;
            next();
        }).catch(next);
    }
};

/**
 * 根据id获得用户审核信息
 */
exports.view = {
    name: 'user-material:view',
    description: '根据id获得用户审核信息',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true}
    },

    run: function (api, data, next) {
        api.services.userMaterial.findById(api, data.params.id).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

/**
 * 平台审核
 */
exports.check = {
    name: 'user-material:check',
    description: '用户提交材料审核',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        type: {
            required: true,
            validator: function(param, connection, actionTemplate){
                if (param === 'platform' || param === 'manager') {
                    return true;
                } else {
                    return "审核用户类型错误: " + param;
                }
            }
        },
        checkValue: {
            required: true
        },
        platformCheckDesc:{
            required:false
        },
        managerCheckDesc:{
            required:false
        }
    },

    run: function (api, data, next) {
        api.services.userMaterial.check(api, data.params).then(function (result) {
            data.response.success = true;
            data.response.message = "审核操作成功";
            next();
        }).catch(next);
    }
};


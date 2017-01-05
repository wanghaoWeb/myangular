var utils = require('../services/utils');

exports.moduleGroupCreate = {
    name: 'module-group-management:create',
    description: '添加模块组',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        desc:{required:true},
        priority:{required:true},
        icon:{required:false}
    },


    run: function (api, data, next) {
        api.services.moduleGroup.create(api, data.params).then(function (moduleGroup) {
            data.response.moduleGroup = moduleGroup.apiData(api);
            next();
        }).catch(next);
    }
};

exports.moduleGroupView = {
    name: 'module-group-management:view',
    description: '模块组查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.moduleGroup.findById(api, data.params.id).then(function (moduleGroup) {
            if (!moduleGroup) {
                next(new Error('moduleGroup not found'));
            } else {
                data.response.moduleGroup = moduleGroup.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.moduleGroupEdit = {
    name: 'module-group-management:edit',
    description: '模块组修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        desc:{required:true},
        priority:{required:true},
        icon:{required:false}
    },

    run: function (api, data, next) {
        api.services.moduleGroup.update(api, data.params).then(function (moduleGroup) {
            data.response.moduleGroup = moduleGroup.apiData(api);
            next();
        }).catch(next);
    }
};
exports.moduleGroupList = {
    name: 'module-group-management:list',
    description: '模块组列表',
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
        api.services.moduleGroup.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteModuleGroup = {
    name: 'module-group-management:delete',
    description: '删除模块组',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.moduleGroup.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};

exports.getAllGroupTitles = {
    name:'module-group-management:getAllGroupTitles',
    description:'获取当前用户所选所有模块的模块组名',
    outputExamples:{},
    middleware: ['logged-in-session'],

    inputs:{
        allModuleGroupIds:{
            required: true,
        }
    },

    run:function(api,data,next){
        api.services.moduleGroup.getAllGroupTitles(api,data.params.allModuleGroupIds).then(function(result){
            data.response.moduleGroups = result;
            next();
        }).catch(next);
    }
}

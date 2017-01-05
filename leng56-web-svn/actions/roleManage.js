var utils = require('../services/utils');

exports.roleList = {
    name:'role-management:list',
    description:'角色列表',
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
        api.services.role.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.roleView = {
    name: 'role-management:view',
    description: '角色查看',
    outputExample: {},
    //middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.role.findById(api, data.params.id).then(function (role) {
            if (!role) {
                next(new Error('role not found'));
            } else {
                data.response.role = role.apiData(api);
                next();
            }
        }).catch(next);
    }
};


exports.roleCreate = {
    name: 'role-management:create',
    description: '角色创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        desc:{required:false},
        modules:{required:false}
    },

    run: function (api, data, next) {
        api.services.role.create(api, data.params).then(function (role) {
            data.response.role = role.apiData(api);
            next();
        }).catch(next);
    }
};



exports.roleEdit = {
    name: 'role-management:edit',
    description: '角色修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        desc:{required:false},
        modules:{required:false}
    },

    run: function (api, data, next) {
        api.services.role.update(api, data.params).then(function (role) {
            data.response.role = role.apiData(api);
            next();
        }).catch(next);
    }
};

exports.deleteRole = {
    name: 'role-management:delete',
    description: '角色删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.role.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};


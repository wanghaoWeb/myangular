var utils = require('../services/utils');

exports.userCreate = {
    name: 'user-management:create',
    description: 'user-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        loginName: {required: true},
        realName: {required: true},
        email: {required: true},
        password: {required: true},
        phone: {required: true},
        activated:{required:false},
        roles:{required:false},
        organizationId:{require:false},
        seatGroupId:{required:false}
    },

    run: function (api, data, next) {
        // 非超级管理员,只能往所属机构添加用户
        if (!data.session.roles['ADMINISTRATOR']) {
            if (!data.session.organizationId) {
                return next(new Error('非机构用户不能支持本操作'));
            }

            data.params.organizationId = data.session.organizationId;
        }
        api.services.user.create(api, data.params).then(function (user) {
            data.response.user = user.apiData(api);
            next();
        }).catch(next);
    }
};

exports.userView = {
    name: 'user-management:view',
    description: 'user-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {

        api.services.user.findById(api, data.params.id).then(function (user) {
            if (!user) {
                next(new Error('user not found'));
            } else {
                data.response.user = user.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.userEdit = {
    name: 'user-management:edit',
    description: 'user-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required: true},
        loginName: {required: true},
        realName: {required: true},
        email: {required: true},
        phone: {required: true},
        activated:{required:false},
        roles:{required:false},
        organizationId:{required:false},
        seatGroupId:{required:false}
    },

    run: function (api, data, next) {
        // 非超级管理员,不能修改用户的所属机构
        if (!data.session.roles['ADMINISTRATOR']) {
            delete data.params.organizationId;
        }
        api.services.user.update(api, data.params).then(function (user) {
            data.response.user = user.apiData(api);
            next();
        }).catch(next);
    }
};

exports.userList = {
    name: 'user-management:list',
    description: '用户列表',
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

        // 非超级管理员,只能查看所属机构的用户
        if (!data.session.roles['ADMINISTRATOR']) {
            if (!data.session.organizationId) {
                return next(new Error('非机构用户不能支持本操作'));
            }

            data.params.where.organizationId = data.session.organizationId;
        }

        api.services.user.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteUser = {
    name: 'user-management:delete',
    description: '用户删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.user.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};


exports.userActivated={
    name:'user-management:activated',
    description:'用户激活',
    outputExamples:{},
    middleware:['logged-in-session'],

    inputs:{
        id:{
            required:true
        },
        activated:{
            required:true
        }
    },

    run:function(api, data, next){
        api.services.user.activated(api, data.params).then(function(result){
            data.response.result=result.result;
            next();
        }).catch(next);
    }
};

exports.isNotExist = {
    name: 'isNotExist:check',
    description: 'isNotExist:check',
    outputExample: {},
    middleware: [],
    inputs: {
        paramName: {require:true},
        paramValue:{require:true},
        paramDesc:{require:false},
        id:{require:false}
    },

    run: function (api, data, next) {
        api.services.user.isNotExist(api, data.params).then(function (result) {
            if (result) {
                var name = data.params.paramDesc ? data.params.paramDesc : data.params.paramName;
                throw new Error(name+'已经存在');
            }

            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.findUserByRoleId = {
    name: 'user-management:findUserByRoleId',
    description: '通过角色ID查询匹配用户',
    outputExample: {},
    middleware: [],
    inputs: {
        roleId:{require:true}
    },

    run: function (api, data, next) {
        api.services.user.findUserByRoleId(api, data.params.roleId).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

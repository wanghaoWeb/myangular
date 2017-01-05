var utils = require('../services/utils');

exports.moduleCreate = {
    name: 'module-management:create',
    description: '模块创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        title: {required: true},
        seq: {required: true},
        icon:{required:false},
        type: {required: true},
        isCheck: {required: false},
        moduleGroupId:{required:false},
        price:{required:false,
            formatter: function(param, connection, actionTemplate){
                return (param === ''|| param === null) ? null : parseFloat(param);
            }
        },
        desc:{required:false},
        materials:{required:false}
    },

    run: function (api, data, next) {
        api.services.module.create(api, data.params).then(function (module) {
            //data.response.module = module.apiData(api);
            data.response.success = true;
            data.response.message = "模块添加成功";
            next();
        }).catch(next);
    }
};

exports.moduleView = {
    name: 'module-management:view',
    description: '模块查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.module.findById(api, data.params.id).then(function (module) {
            if (!module) {
                next(new Error('module not found'));
            } else {
                data.response.module = module.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.moduleEdit = {
    name: 'module-management:edit',
    description: '模块修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        title: {required: true},
        seq: {required: true},
        icon:{required:false},
        type: {required: true},
        isCheck: {required: false},
        moduleGroupId:{required:false},
        price:{required:false,
            formatter: function(param, connection, actionTemplate){
                return (param === ''|| param === null) ? null : parseFloat(param);
            }
        },
        desc:{required:false},
        materials:{required:false}
    },

    run: function (api, data, next) {
        api.services.module.update(api, data.params).then(function (module) {
            //data.response.module = module.apiData(api);
            data.response.success = true;
            data.response.message = "模块修改成功";
            next();
        }).catch(next);
    }
};
exports.moduleList = {
    name: 'module-management:list',
    description: '模块列表',
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
        api.services.module.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteModule = {
    name: 'module-management:delete',
    description: '模块删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.module.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "模块删除成功";
            next();
        }).catch(next);
    }
};

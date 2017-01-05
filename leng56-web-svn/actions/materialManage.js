var utils = require('../services/utils');

exports.materialCreate = {
    name: 'material-management:create',
    description: '添加材料',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        title: {required: false},
        seq: {required: true},
        isPlatformCheck: {required: false},
        isManagerCheck: {required: false},
        desc:{required:false},
        modules:{required:false},
        params:{required:false}
    },

    run: function (api, data, next) {
        api.services.material.create(api, data.params).then(function() {
            data.response.success = true;
            data.response.message = "材料添加成功";
            next();
        }).catch(next);
    }
};

exports.materialView = {
    name: 'material-management:view',
    description: '材料查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.material.findById(api, data.params.id).then(function (material) {
            if (!material) {
                next(new Error('material not found'));
            } else {
                data.response.material = material.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.materialEdit = {
    name: 'material-management:edit',
    description: '材料修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        title: {required: true},
        seq: {required: true},
        isPlatformCheck: {required: false},
        isManagerCheck: {required: false},
        desc:{required:false},
        modules:{required:false},
        params:{required:false}
    },

    run: function (api, data, next) {
        api.services.material.update(api, data.params).then(function (material) {
            data.response.success = true;
            data.response.message = "材料修改成功";
            next();
        }).catch(next);
    }
};
exports.materialList = {
    name: 'material-management:list',
    description: '材料列表',
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
        api.services.material.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteMaterial = {
    name: 'material-management:delete',
    description: '材料删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.material.delete(api, data.params).then(function(result) {
            data.response.success = true;
            data.response.message = "成功删除材料";
            next();
        }).catch(next);
    }
};

var utils = require('../services/utils');

exports.metaDataTypeCreate = {
    name: 'metaDataType-management:create',
    description: '元数据类型创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        code:{required:true},
        name: {required: true},
        remark:{required:true},
    },

    run: function (api, data, next) {
        api.services.metaDataType.create(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "元数据类型添加成功";
            next();
        }).catch(next);
    }
};

exports.metaDataTypeView = {
    name: 'metaDataType-management:view',
    description: '元数据类型查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.metaDataType.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.metaDataTypeEdit = {
    name: 'metaDataType-management:edit',
    description: '元数据类型修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        code:{required:true},
        name: {required: true},
        remark:{required:true}
    },

    run: function (api, data, next) {
        api.services.metaDataType.update(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "元数据类型修改成功";
            next();
        }).catch(next);
    }
};
exports.metaDataTypeList = {
    name: 'metaDataType-management:list',
    description: '元数据类型列表',
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
        api.services.metaDataType.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteMetaDataType = {
    name: 'metaDataType-management:delete',
    description: '元数据类型删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.metaDataType.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "元数据类型删除成功";
            next();
        }).catch(next);
    }
};

var utils = require('../services/utils');

exports.metaDataCreate = {
    name: 'metaData-management:create',
    description: '元数据创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        value:{required:true},
        seq:{required:true},
        typeCode:{required:true}
    },

    run: function (api, data, next) {
        api.services.metaData.create(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "元数据添加成功";
            next();
        }).catch(next);
    }
};

exports.metaDataView = {
    name: 'metaData-management:view',
    description: '元数据查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.metaData.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.metaDataEdit = {
    name: 'metaData-management:edit',
    description: '元数据修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        value:{required:true},
        seq:{required:true},
        typeCode:{required:true}
    },

    run: function (api, data, next) {
        api.services.metaData.update(api, data.params).then(function (result) {
            //data.response.result = result.apiData(api);
            data.response.success = true;
            data.response.message = "元数据修改成功";
            next();
        }).catch(next);
    }
};

exports.metaDataList = {
    name: 'metaData-management:list',
    description: '元数据列表',
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
        api.services.metaData.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.getByTypeCode = {
    name: 'metaData-management:byTypeCode',
    description: '通过元数据类型获得元数据列表',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        typeCode: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.metaData.findByTypeCode(api, data.params.typeCode).then(function(result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.deleteMetaData = {
    name: 'metaData-management:delete',
    description: '元数据删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.metaData.delete(api, data.params).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "元数据删除成功";
            next();
        }).catch(next);
    }
};

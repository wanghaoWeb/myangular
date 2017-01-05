var utils = require('../services/utils');

exports.allianceCreate = {
    name: 'alliance-management:create',
    description: '联盟创建',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        desc:{required:false},
        organizations:{required:false}
    },

    run: function (api, data, next) {
        api.services.alliance.create(api, data.params).then(function (result) {
            data.response.result = result;
            data.response.success = true;
            data.response.message = "联盟添加成功";
            next();
        }).catch(next);
    }
};

exports.allianceView = {
    name: 'alliance-management:view',
    description: '联盟查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.alliance.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

exports.allianceEdit = {
    name: 'alliance-management:edit',
    description: '联盟修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        desc:{required:false},
        organizations:{required:false}

    },

    run: function (api, data, next) {
        api.services.alliance.update(api, data.params).then(function (result) {
            data.response.result = result;
            data.response.success = true;
            data.response.message = "联盟修改成功";
            next();
        }).catch(next);
    }
};
exports.allianceList = {
    name: 'alliance-management:list',
    description: '联盟列表',
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
        api.services.alliance.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteAlliance = {
    name: 'alliance-management:delete',
    description: '联盟删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.alliance.delete(api, data.params.id).then(function(result) {
            //data.response.result = result.result;
            data.response.success = true;
            data.response.message = "联盟删除成功";
            next();
        }).catch(next);
    }
};

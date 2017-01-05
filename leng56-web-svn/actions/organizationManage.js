var utils = require('../services/utils');

exports.organizationList = {
    name: 'organization-management:list',
    description: '组织列表',
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
        api.services.organization.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};
exports.organizationView = {
    name: 'organization-management:view',
    description: '组织查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },
    run: function (api, data, next) {
        api.services.organization.findById(api, data.params.id).then(function (organization) {
            if (!organization) {
                next(new Error('organization not found'));
            } else {
                data.response.organization = organization.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.organizationCreate = {
    name: 'organization-management:create',
    description: '添加组织',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        code:{required:true},
        name: {required: true},
        desc:{required:true}
    },

    run: function (api, data, next) {
        data.params.creatorId = data.session.userId;
        api.services.organization.create(api, data.params).then(function (organization) {
            data.response.organization = organization.apiData(api);
            next();
        }).catch(next);
    }
};


exports.organizationEdit = {
    name: 'organization-management:edit',
    description: '组织修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        code:{required:true},
        name: {required: true},
        desc:{required:true},
    },

    run: function (api, data, next) {
        api.services.organization.update(api, data.params).then(function (organization) {
            data.response.organization = organization.apiData(api);
            next();
        }).catch(next);
    }
};

exports.deleteOrganization = {
    name: 'organization-management:delete',
    description: '组织删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.organization.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};


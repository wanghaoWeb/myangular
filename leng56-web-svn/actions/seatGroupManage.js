/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.seatGroupCreate = {
    name: 'seat-group-management:create',
    description: '添加坐席组',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required: true},
        desc:{required:true},
        seq:{required:true}
    },

    run: function (api, data, next) {
        if (!data.session.organizationId) {
            return next(new Error('非机构用户不能支持本操作'));
        }
        data.params.organizationId=data.session.organizationId;
        api.services.seatGroup.create(api, data.params).then(function (seatGroup) {
            data.response.seatGroup = seatGroup.apiData(api);
            next();
        }).catch(next);
    }
};

exports.seatGroupView = {
    name: 'seat-group-management:view',
    description: '坐席组查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.seatGroup.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('result not found'));
            } else {
                data.response.seatGroup = result;
                next();
            }
        }).catch(next);
    }
};

exports.seatGroupEdit = {
    name: 'seat-group-management:edit',
    description: '坐席组修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required: true},
        desc:{required:true},
        seq:{require:true}
    },

    run: function (api, data, next) {
        data.params.organizationId=data.session.organizationId;

        api.services.seatGroup.update(api, data.params).then(function (seatGroup) {
            data.response.seatGroup = seatGroup.apiData(api);
            next();
        }).catch(next);
    }
};
exports.seatGroupList = {
    name: 'seat-group-management:list',
    description: '坐席组列表',
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
        if (!data.session.organizationId) {
            return next(new Error('非机构用户不能支持本操作'));
        }
        data.params.where.organizationId=data.session.organizationId;

        api.services.seatGroup.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.deleteSeatGroup = {
    name: 'seat-group-management:delete',
    description: '删除坐席组',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.seatGroup.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};

exports.organizationGroups = {
    name: 'seat-group-management:organizationGroups',
    description: '当前组织机构坐席组',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {},

    run: function (api, data, next) {
        if (!data.session.organizationId) {
            return next(new Error('非机构用户不能支持本操作'));
        }
        data.params.organizationId=data.session.organizationId;
        api.services.seatGroup.findAllByOrganizationId(api, data.params.organizationId).then(function(result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

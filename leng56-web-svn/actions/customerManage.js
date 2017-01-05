/**
 * Created by Administrator on 2016/12/12.
 */
var utils = require('../services/utils');

exports.customerList = {
    name: 'customer-management:list',
    description: '客户列表',
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
        api.services.customer.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};
exports.customerView = {
    name: 'customer-management:view',
    description: '客户查看',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },
    run: function (api, data, next) {
        api.services.customer.findById(api, data.params.id).then(function (customer) {
            if (!customer) {
                next(new Error('customer not found'));
            } else {
                data.response.customer = customer;
                next();
            }
        }).catch(next);
    }
};

exports.customerCreate = {
    name: 'customer-management:create',
    description: '添加客户',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        name: {required:true},
        linkman: {required:false},
        phone: {required:false},
        business: {required:false},
        regionId: {required:false},
        address: {required:false},
        organizationId: {required:false},
        remark: {required:false},
        openingBank: {required:false},
        account: {required:false},
        accountName: {required:false},
        billingType: {required:false},
        billingTitle: {required:false},
        taxpayerNo: {required:false},
        creatorId: {required:false},
        seatGroupId: {required:false}
    },

    run: function (api, data, next) {
        data.params.creatorId = data.session.userId;
        data.params.organizationId = data.session.organizationId;
        api.services.customer.create(api, data.params).then(function (customer) {
            data.response.customer = customer;
            next();
        }).catch(next);
    }
};


exports.customerEdit = {
    name: 'customer-management:edit',
    description: '客户修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        name: {required:true},
        linkman: {required:false},
        phone: {required:false},
        business: {required:false},
        regionId: {required:false},
        address: {required:false},
        organizationId: {required:false},
        remark: {required:false},
        openingBank: {required:false},
        account: {required:false},
        accountName: {required:false},
        billingType: {required:false},
        billingTitle: {required:false},
        taxpayerNo: {required:false},
        seatGroupId: {required:false}
    },

    run: function (api, data, next) {
        api.services.customer.update(api, data.params).then(function (customer) {
            data.response.customer = customer;
            next();
        }).catch(next);
    }
};

exports.deleteCustomer = {
    name: 'customer-management:delete',
    description: '客户删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.customer.delete(api, data.params.id).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};


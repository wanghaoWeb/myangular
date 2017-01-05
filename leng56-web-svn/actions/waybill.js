var utils = require('../services/utils');

exports.waybillCreate = {
    name: 'waybill-management:create',
    description: 'waybill-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
    },

    run: function (api, data, next) {
        api.services.identifier.next(api).then(function(value){
            data.params.code = value;
            api.services.waybill.create(api, data.params).then(function (result) {
                data.response.result = result;
                data.response.message = "运单生成成功！"
                next();
            }).catch(next);
        })
    }
};

exports.waybillView = {
    name: 'waybill-management:view',
    description: 'waybill-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybill.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('waybill not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

exports.waybillEdit = {
    name: 'waybill-management:edit',
    description: 'waybill-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        waybillId:{required:true},
        status:{required:false}
    },

    run: function (api, data, next) {
        api.services.waybill.update(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.waybillList = {
    name: 'waybill-management:list',
    description: 'waybill-management:list',
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
        api.services.waybill.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

/**
 * 查询指定司机的运单列表
 */
exports.listByDriver = {
    name: 'waybill-management:listByDriver',
    description: 'waybill-management:listByDriver',
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
        data.params.userId = data.session.userId;

        api.services.waybill.findAndCountDriver(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.waybillDelete = {
    name: 'waybill-management:delete',
    description: 'waybill-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybill.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};

/**
 * 司机确认接单
 */
exports.driverConfirmReceived = {
    name: 'waybill-management:driverConfirmReceived',
    description: '司机确认接单',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybill.driverConfirmReceived(api, data.params.id).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

/**
 * 司机确认已装货
 */
exports.driverConfirmLoaded = {
    name: 'waybill-management:driverConfirmLoaded',
    description: '司机确认已装货',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybill.driverConfirmLoaded(api, data.params.id).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

/**
 * 司机确认已经送达
 */
exports.driverConfirmServed = {
    name: 'waybill-management:driverConfirmServed',
    description: '司机确认已经送达',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.waybill.driverConfirmServed(api, data.params.id).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

/**
 * 司机上传回单
 */
exports.driverUploadAckImg = {
    name: 'waybill-management:driverUploadAckImg',
    description: '司机上传回单',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        },
        img: {
            required: true
        },
        remark: {
            required: false
        }
    },

    run: function (api, data, next) {
        api.services.waybill.driverUploadAckImg(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.vehicleCreate = {
    name: 'vehicle-management:create',
    description: 'vehicle-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        ownerType: {required: false},
        ownerId: {required: false},
        driverId: {required: false},
        phone: {required: false},
        no: {required: false},
        load:{require:false},
        type: {required: false},
        length: {required: false},
        image:{require:false},
        boxBrand: {required: false},
        refrigeratorBrand: {required: false},
        lowestTemp:{require:false},
        highestTemp: {required: false},
        lines: {
            required: false,
            formatter:function(param){
                return JSON.stringify(param);
            }
        },
        licenseAuth:{require:false},
        terminalTypeId: {required: false},
        seatGroupId:{require:false},
        trustStatus: {required: false},
        visibility: {required: false},
    },

    run: function (api, data, next) {
        // 如果当前用户为个人车主
        if (data.session.roles['TRANSPORT_VEHICLE_OWNER']) {
            data.params.ownerId = data.session.userId;
            data.params.ownerType = 'OWNER';
        } else if (data.session.roles['TRANSPORT_ADMINISTRATOR'] || data.session.roles['TRANSPORT_DISPATCHER']) {
            if (!data.params.ownerType)
                data.params.ownerType = 'ORGANIZATION';

            if (data.params.ownerType === 'ORGANIZATION') {
                data.params.ownerId = data.session.organizationId;
            } else if (data.params.ownerType === 'OWNER') {
                data.params.trustStatus = 'CHECK_PASS';
                data.params.organizationId = data.session.organizationId;
            }

            if (data.session.roles['TRANSPORT_DISPATCHER']) {
                data.params.seatGroupId = data.session.seatGroupId;
            }
        } else {
            return next(new Error('非运输企业用户不能支持本操作'));
        }

        data.params.creatorId = data.session.userId;
        api.services.vehicle.create(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.vehicleView = {
    name: 'vehicle-management:view',
    description: 'vehicle-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.vehicle.findById(api, data.params.id).then(function (result) {
            if (!result) {
                next(new Error('vehicle not found'));
            } else {
                var resultData = result.get({plain: true});
                resultData.lines = JSON.parse(resultData.lines);
                resultData.now = new Date();
                data.response.result = resultData;
                next();
            }
        }).catch(next);
    }
};

exports.vehicleEdit = {
    name: 'vehicle-management:edit',
    description: 'vehicle-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        ownerId: {required: false},
        driverId: {required: false},
        phone: {required: false},
        no: {required: false},
        load:{require:false},
        type: {required: false},
        length: {required: false},
        image:{require:false},
        boxBrand: {required: false},
        refrigeratorBrand: {required: false},
        lowestTemp:{require:false},
        highestTemp: {required: false},
        lines: {
            required: false,
            formatter:function(param){
                return JSON.stringify(param);
            }
        },
        licenseAuth:{require:false},
        terminalTypeId: {required: false},
        organizationId:{required:false},
        seatGroupId:{require:false},
        trustStatus: {required: false},
        visibility: {required: false},
        dispatchCityId:{required:false},
        dispatchTime:{required:false}
    },

    run: function (api, data, next) {
        // 如果当前用户为个人车主
        if (data.session.roles['TRANSPORT_VEHICLE_OWNER']) {
            delete data.params.ownerId;
            delete data.params.ownerType;
        } else if (data.session.roles['TRANSPORT_ADMINISTRATOR'] || data.session.roles['TRANSPORT_DISPATCHER']) {

        } else {
            return next(new Error('非运输企业用户不能支持本操作'));
        }

        delete data.params.creatorId;
        api.services.vehicle.update(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.vehicleList = {
    name: 'vehicle-management:list',
    description: '车辆列表',
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

        // 如果当前用户为个人车主
        if (data.session.roles['TRANSPORT_VEHICLE_OWNER']) {
            data.params.where.ownerId = data.session.userId;
        } else if (data.session.roles['TRANSPORT_ADMINISTRATOR']) {
            data.params.where.ownerId = data.session.organizationId;
            data.params.where.organizationId = data.session.organizationId;
        } else if (data.session.roles['TRANSPORT_DISPATCHER']) {
            if (!data.session.seatGroupId) {
                return next(new Error('用户未分配坐席组'));
            }

            data.params.where.seatGroupId = data.session.seatGroupId;
        } else if (data.session.roles['ADMINISTRATOR']) {

        } else {
            return next(new Error('用户不能支持本操作'));
        }

        api.services.vehicle.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            data.response.now = new Date();
            next();
        }).catch(next);
    }
};

exports.deleteVehicle = {
    name: 'vehicle-management:delete',
    description: '用户删除',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.vehicle.delete(api, data.params.id).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};

exports.getVehicles = {
    name: 'vehicle-management:getVehicles',
    description: '根据参数获取所有车辆',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        taskId:{required:true},
        visibility:{required:false},
        fromCityId:{required:false},
        toCityId:{required:false},
        loadingTime:{required:false},
        length:{required:false},
        type:{required:false},
        lowestTemp:{required:false},
        highestTemp:{required:false}
    },

    run: function (api, data, next) {
        data.params.visibility = JSON.parse(data.params.visibility);
        data.params.visibility = {
            all:data.params.visibility.all ? true : false,
            union:data.params.visibility.union  ? true : false,
            private:data.params.visibility.private ? true : false,
        };
        data.params.organizationId = data.session.organizationId;
        data.params.seatGroupId = data.session.seatGroupId;
        api.services.vehicle.getVehicles(api, data.params).then(function(result) {
            if (!result) {
                next(new Error('vehicle not found'));
            } else {
                result.rows.forEach(function(res){
                    res.lines = JSON.parse(res.lines);
                });
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
};

exports.getTasks = {
    name: 'vehicle-management:getTasks',
    description: '根据参数获取所有车辆',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs:{
        vehicleId:{required:true},
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
                return 3;
            }
        },
    },

    run:function(api, data, next){
        api.services.taskDispatchOffer.getTasks(api, data.params).then(function(result){
            if (!result) {
                next(new Error('vehicle not found'));
            } else {
                data.response.result = result;
                next();
            }
        }).catch(next);
    }
}

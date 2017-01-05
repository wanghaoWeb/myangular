/**
 * Created by Administrator on 2016/12/6.
 */
var utils = require('../services/utils');

exports.vehicleDrivingLicenseCreate = {
    name: 'vehicleDrivingLicense-management:create',
    description: 'vehicleDrivingLicense-management:create',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        vehicleId: {required: false},
        frontImg: {required: false},
        sideImg: {required: false},
        licenseImg: {required: false},
        status:{require:false},
        current: {required: false},
        statusDescription: {required: false},
    },

    run: function (api, data, next) {
        api.services.vehicleDrivingLicense.create(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.vehicleDrivingLicenseView = {
    name: 'vehicleDrivingLicense-management:view',
    description: 'vehicleDrivingLicense-management:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.vehicleDrivingLicense.findById(api, data.params.id).then(function (result) {
            if (!user) {
                next(new Error('vehicleDrivingLicense not found'));
            } else {
                data.response.result = result.apiData(api);
                next();
            }
        }).catch(next);
    }
};

exports.vehicleDrivingLicenseEdit = {
    name: 'vehicleDrivingLicense-management:edit',
    description: 'vehicleDrivingLicense-management:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {required: true},
        vehicleId: {required: true},
        frontImg: {required: false},
        sideImg: {required: false},
        licenseImg: {required: false},
        status:{require:false},
        current: {required: false},
        statusDescription: {required: false},
    },

    run: function (api, data, next) {
        api.services.vehicleDrivingLicense.update(api, data.params).then(function (result) {
            data.response.result = result.apiData(api);
            next();
        }).catch(next);
    }
};

exports.vehicleDrivingLicenseList = {
    name: 'vehicleDrivingLicense-management:list',
    description: 'vehicleDrivingLicense-management:list',
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
        api.services.vehicleDrivingLicense.findAndCountAll(api, data.params).then(function(result) {
            data.response.result = result.rows;
            data.response.count = result.count;
            next();
        }).catch(next);
    }
};

exports.vehicleDrivingLicenseVehicle = {
    name: 'vehicleDrivingLicense-management:delete',
    description: 'vehicleDrivingLicense-management:delete',
    outputExamples: {},
    middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.vehicleDrivingLicense.delete(api, data.params).then(function(result) {
            data.response.result = result.result;
            next();
        }).catch(next);
    }
};



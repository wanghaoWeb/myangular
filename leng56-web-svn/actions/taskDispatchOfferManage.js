
exports.taskDispatchOfferEdit = {
    name: 'taskDispatchOffer-management:edit',
    description: '修改',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required:true},
        offer: {required: false},
        status:{required:false}
    },

    run: function (api, data, next) {
        api.services.taskDispatchOffer.update(api, data.params).then(function (result) {
            data.response.success = true;
            data.response.result = result;
            next();
        }).catch(next);
    }
};

exports.getOfferedVehicles = {
    name:'TaskDispatchOffer-management:getOfferedVehicles',
    description:'根据taskId获得已报价的车辆',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        taskId:{required:true},
    },

    run: function (api, data, next) {
        api.services.taskDispatchOffer.getOfferedVehicles(api, data.params).then(function (result) {
            data.response.success = true;
            data.response.result = result;
            next();
        }).catch(next);
    }
}

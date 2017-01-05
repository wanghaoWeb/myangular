
/**
 * 获得用户选择的和未选择的服务模块列表
 */
exports.userModuleList = {
    name: 'userModule:list',
    description: '用户选择的和未选择的服务模块列表',
    outputExample: {},

    middleware: ['logged-in-session'],

    inputs: {

    },

    run: function (api, data, next) {
        api.services.userModule.findUserAllList(api, data.session.userId).then(function (result) {
            data.response.data = result;
            next();
        }).catch(next);
    }
};

/**
 * 当前用户已经选择的服务模块列表
 */
exports.selectedUserSeviceList = {
    name: 'userModule:selected',
    description: '当前用户已经选择的服务模块列表',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {

    },

    run: function (api, data, next) {
        api.services.userModule.findUserSelectedList(api, data.session.userId).then(function (result) {
            data.response.data = result;
            next();
        }).catch(next);
    }
};

/**
 * 保存用户选择的服务模块
 */
exports.saveUserModuleList = {
    name: 'userModule:save',
    description: '保存用户选择的服务模块',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        userModuleIds: {
            required: true,
            formatter: function(param, connection, actionTemplate){
                return param.trim() ==='' ? [] : param.split(',');
            }
        }
    },

    run: function (api, data, next) {
        api.services.userModule.saveUserModules(api, data.session.userId, data.params.userModuleIds).then(function (result) {
            data.response.data = result;
            data.response.success = true;
            next();
        }).catch(next);
    }
};

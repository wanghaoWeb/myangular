module.exports = {
    loadPriority:  1000,
    startPriority: 1000,
    stopPriority:  1000,

    initialize: function(api, next){
        var middleware = {
            name: 'module_material_check',
            global: false,
            priority: 1101,
            preProcessor: function(data, next){

                // 从session中获得userId
                var userId = data.session.userId;

                // 查询当前请求的服务模块
                var actionName = data.action.split(/[.:,]+/);
                var moduleName = actionName[0];
                api.services.module.findModuleMaterialByModuleName(api, moduleName).then(function (result) {
                    if (!result || result.length == 0) {
                        next();
                        return;
                    }
                    // 查询用户是否有权限访问该服务模块
                    return [result, api.services.user.findUserMaterialByUserId(api, userId)];
                }).spread(function (moduleMaterials, userMaterials) {
                    if (!moduleMaterials || moduleMaterials.length == 0) {
                        next();
                    } else {
                        // 将用户材料信息hash化方便查询
                        var userMaterialsHash = api.services.utils.arrayToObject(userMaterials, 'materialId');

                        // 生成用户对当前模块的材料提交情况
                        var userModuleMaterials = [];
                        for (var i = 0; i < moduleMaterials.length; i++) {
                            var umm = {
                                userId: userId,
                                moduleId: moduleMaterials[i].moduleId,
                                moduleName: moduleMaterials[i].moduleName,
                                materialId: moduleMaterials[i].materialId,
                                materialName: moduleMaterials[i].materialName,
                                status: api.services.Constants.USER_MATERIAL_STATUS.NO_SUBMIT
                            };

                            if (userMaterialsHash[moduleMaterials[i].materialId]) {
                                umm.status = userMaterialsHash[moduleMaterials[i].materialId].status;
                            }

                            userModuleMaterials.push(umm);
                        }

                        // 如果有材料未审核通过则返回错误信息
                        for (var i = 0; i < userModuleMaterials.length; i++) {
                            if (userModuleMaterials[i].status !== api.services.Constants.USER_MATERIAL_STATUS.CHECK_PASS) {
                                data.response.result = userModuleMaterials;
                                next(new Error(api.services.Constants.ERROR_CODE.MODULE_MATERIAL_CHECK_ERROR));
                                return;
                            }
                        }
                    }
                }).catch(next);

            }
        };

        api.actions.addMiddleware(middleware);

        next();
    },

    start: function(api, next){
        next();
    },

    stop: function(api, next){
        next();
    }
};



exports.view = {
    name: 'material:view',
    description: '通过参数获得材料信息',
    outputExample: {},
    middleware: [],

    inputs: {
        id: {
            required: false
        },
        name: {
            required: false
        }
    },

    run: function (api, data, next) {
        // 生成查询参数
        var params = {};
        if (data.params.id)
            params.id = data.params.id;
        if (data.params.name)
            params.name = data.params.name;

        // 验证参数
        if (!params.id && !params.name) {
            next(new Error("参数不能全部为空"));
            return;
        }

        // 查询数据
        api.services.material.findOne(api, params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }

};

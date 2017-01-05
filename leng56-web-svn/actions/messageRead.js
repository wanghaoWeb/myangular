exports.view = {
    name: 'messageRead:read',
    description: '保存消息的已读状态',
    outputExample: {},
    middleware: [],

    inputs: {
        messageId: {
            required: false
        },
        userId: {
            required: false
        }
    },

    run: function (api, data, next) {
        // 查询数据
        api.services.messageRead.read(api, data.params).then(function () {
            data.response.success = true;
            next();
        }).catch(next);
    }
};

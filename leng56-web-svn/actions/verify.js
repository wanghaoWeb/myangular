
/**
 * 生成验证码
 */
exports.generate = {
    name: 'verify:generate',
    description: '生成验证码',
    outputExample: {},

    inputs: {
        phone: {required: true}
    },

    run: function (api, data, next) {
        api.services.verificationCode.generate(api, data.params.phone).then(function (result) {
            var message = '【冷藏网】您的短信验证码为：' + result;
            api.services.sms.send(data.params.phone, message);
            data.response.message = "消息发送成功";
            next();
        }).catch(next);
    }
};

/**
 * 验证验证码
 */
exports.verify = {
    name: 'verify:verify',
    description: '验证验证码',
    outputExample: {},

    inputs: {
        phone: {required: true},
        code: {required: true}
    },

    run: function (api, data, next) {
        api.services.verificationCode.verify(api, data.params.phone, data.params.code).then(function (result) {
            data.response.data = result;
            next();
        }).catch(next);
    }
};

/**
 * 删除验证码
 */
exports.remove = {
    name: 'verify:remove',
    description: '删除验证码',
    outputExample: {},

    inputs: {
        phone: {required: true}
    },

    run: function (api, data, next) {
        api.services.verificationCode.remove(api, data.params.phone).then(function () {
            data.response.data = "删除成功";
            next();
        }).catch(next);
    }
};


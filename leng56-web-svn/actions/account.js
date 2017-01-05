exports.accountCreate = {
    name: 'account:create',
    description: 'account:create',
    outputExample: {},
    middleware: [],

    inputs: {
        loginName: {required: true},
        realName: {required: true},
        email: {required: true},
        password: {required: true},
        phone: {required: true},
        confirmPassword: {required: false},
        code:{required:true}
    },

    run: function (api, data, next) {
       api.services.verificationCode.verify(api, data.params.phone, data.params.code).then(function (result) {
           if(result){
              return api.services.user.create(api, data.params).then(function (user) {
                   api.services.verificationCode.remove(api, user.phone);
                   data.response.user = user;
                   next();
               })
           }else{
               next(new Error("验证码不正确！"));
           }
       }).catch(next);
    }
};

exports.driverCreate = {
    name: 'account:createDriver',
    description: 'account:createDriver',
    outputExample: {},
    middleware: [],

    inputs: {
        loginName: {required: true},
        realName: {required: true},
        email: {required: true},
        password: {required: true},
        phone: {required: true},
        confirmPassword: {required: false},
        code:{required:true}
    },

    run: function (api, data, next) {
        data.params.roles = [{roleId: 'TRANSPORT_DRIVER'}];
        api.services.verificationCode.verify(api, data.params.phone, data.params.code).then(function (result) {
            if(result){
                return api.services.user.create(api, data.params).then(function (user) {
                    api.services.verificationCode.remove(api, user.phone);
                    data.response.user = user;
                    next();
                });
            }else{
                next(new Error("验证码不正确！"));
            }
        }).catch(next);
    }
};

exports.resetPassword = {
    name:'account:resetPassword',
    description:'account:resetPassword',
    ouputExample:{},

    inputs:{
        phone:{required:true},
        code:{required:true},
        password:{required:true}
    },

    run:function(api,data,next){
        api.services.user.resetPassword(api, data.params).then(function(user){
            data.response.success = true;
            data.response.message = "密码修改成功";
            next();
        }).catch(next);
    }
};

exports.modifyPassword = {
    name: 'account:modifyPassword',
    description: 'account:modifyPassword',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        password: {required: true},
        oldpassword:{required:true}
    },

    run: function (api, data, next) {

        data.params.id = data.session.userId;
        api.services.user.updatePassword(api, data.params).then(function (user) {
            data.response.success = true;
            data.response.message = "修改密码成功";
            next();
        }).catch(next);
    }
};


exports.accountCheck = {
    name: 'account:check',
    description: 'account:check',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {},

    run: function (api, data, next) {

        api.services.user.findAccountDetailById(api, data.session.userId).then(function (user) {
            if (!user) {
                next(new Error('user not found'));
            } else {
                data.response.user = user;
                next();
            }
        }).catch(next);


    }
};

exports.accountView = {
    name: 'account:view',
    description: 'account:view',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {},

    run: function (api, data, next) {
        api.services.user.findById(api, data.session.userId).then(function (user) {
            if (!user) {
                next(new Error('user not found'));
            } else {
                user = user.apiData(api);
                data.response.user = user;
                next();
            }
        }).catch(next);
    }
};

exports.accountEdit = {
    name: 'account:edit',
    description: 'account:edit',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        id:{required: false},
        loginName: {required: true},
        realName: {required: true},
        email: {required: true},
        phone: {required: true}
    },

    run: function (api, data, next) {
        api.services.user.update(api, data.params).then(function (user) {
            data.response.user = user.apiData(api);
            next();
        }).catch(next);
    }
};

exports.updatePwd = {
    name:'account:updatePwd',
    description:'account:updatePwd',
    ouputExample:{},

    inputs:{
        loginName:{required:true},
        phone:{required:true},
        code:{required:true},
        password:{required:true}
    },

    run:function(api,data,next){
        api.services.verificationCode.verify(api, data.params.phone, data.params.code).then(function (result) {
            if(result){
                return api.services.user.updatePwd(api,data.params).then(function(user){
                    api.services.verificationCode.remove(api, user.phone);
                    data.response.user = user;
                    data.response.success = true;
                    data.response.message = "密码修改成功"
                    next();
                });
            }else{
                next(new Error("验证码不正确！"))
            }
        }).catch(next);
    }
};
exports.verifyUser = {
    name:'verify:user',
    description:'verify:user',
    outputExample:{},

    inputs:{
        loginName:{required:true},
        phone:{required:true}
    },

    run:function(api,data,next){
        api.models.User.findOne({where:{loginName:data.params.loginName,phone:data.params.phone}}).then(function(result){
            if(result){
                api.services.verificationCode.generate(api, data.params.phone).then(function(result){
                    var message = '【冷藏网】您的短信验证码为：' + result;
                    api.services.sms.send(data.params.phone, message);
                    data.response.message = "消息发送成功";
                    data.response.success = true;
                    next();
                });
            }else{
                throw new Error("用户名错误或不存在！")
            }
        }).catch(next);
    }
};
/**
 * 获得当前用户有权限分配的角色
 */
exports.canAssignRoles = {
    name:'account:canAssignRoles',
    description:'获得当前用户有权限分配的角色',
    outputExample:{},
    middleware: ['logged-in-session'],

    inputs:{

    },

    run:function(api,data,next){

        api.services.roleAssign.findUserCanAssign(api, data.session.userId).then(function(result){
            if (result){
                var roles = [];
                var roleIds = {};
                result.forEach(function (role) {
                    // 去重处理
                    if (!roleIds[role.assignRole.id]) {
                        roles.push(role.assignRole);
                        roleIds[role.assignRole.id] = true;
                    }

                });
                data.response.result = roles;
                next();
            }else{
                throw new Error("角色列表为空！")
            }
        }).catch(next);
    }
}

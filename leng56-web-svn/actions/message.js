var utils = require('../services/utils');
exports.mine = {
    name: 'message:mine',
    description: '通过参数获得消息',
    outputExample: {},
    middleware: ['logged-in-session'],

    inputs: {
        where:{
          required:false
        },
        sort:{
            required:false,
            formatter: function(param, connection, actionTemplate){
                return utils.generateSort(param);
            }
        },
        page:{
            required:false,
            formatter:function(param){
                return parseInt(param)
            },
            default:function(){
                return 0;
            }
        },
        size:{
            required:false,
            formatter:function(param){
               return parseInt(param)
            },
            default:function(){
                return 20;
            }
        }
    },

    run: function (api, data, next) {
        // 查询数据
        data.params.userId = data.session.userId;
        data.params.organizationId = data.session.organizationId;
        api.services.message.findAll(api, data.params).then(function (result) {
            data.response.result = result;
            next();
        }).catch(next);
    }
};


exports.messageView = {
    name: 'message:view',
    description: '消息查看',
    outputExample: {},
    //middleware: ['logged-in-session'],

    inputs: {
        id: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.services.message.findById(api, data.params.id).then(function (message) {
            data.response.message = message;
            next();
        }).catch(next)
    }
};

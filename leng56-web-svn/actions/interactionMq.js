/**
 * Created by hehui on 2016/12/22.
 */

/**
 * pc端充值发送消息
 * @type {{name: string, description: string, outputExample: {}, middleware: string[], inputs: {serialID: {required: boolean}, sendTime: {required: boolean}, customerIP: {required: boolean}, totalAmount: {required: boolean}, orderDetails: {required: boolean}, orderID: {required: boolean}}, run: Function}}
 */
exports.sendRechargepc={
    name:'send-rechargepc:sendrechargequeuepc',
    description:'send-rechargepc:sendrechargequeuepc',
    outputExample: {},
    inputs:{
        serialID: {required: true},
        sendTime: {required: true},
        customerIP: {required: true},
        totalAmount: {required: true},
        orderDetails: {required: true},
        orderID:{required:true}
    },
    run: function (api, data, next) {
        console.log( data.params);
        api.services.sendToRabbitMq.sendRechargeQueue(api, data.params);
    }
};
/**
 * 移动端充值
 * @type {{}}
 */
exports.sendRechargeapp={
    name:'send-rechargeapp:sendrechargequeueapp',
    description:'send-rechargeapp:sendrechargequeueapp',
    outputExample: {},

    inputs:{
        merId: {required: true},
        virCardNoIn: {required: true},
        orderID: {required: true},
        tranAmt: {required: true},
        merFeeAmt: {required: true},
        returnUrl:{required:true},
        sendTime:{required:true},
        tranIp:{required:true},
        goodsName:{required:true},
        goodsDetail:{required:true},
        merUserId:{required:true},
        buyerName:{required:true},
        idNumber:{required:true},
        phone:{required:true},
        cardNo:{required:true}

    },
    run: function (api, data, next) {
        console.log(data.params);
        api.services.sendToRabbitMq.sendRechargeQueue(api, data.params);
    }
};
/**
 *
 * @type {{name: string, description: string, outputExample: {}, middleware: string[], inputs: {orderInfo: {required: boolean}}, run: Function}}
 */
exports.sendTransfer={
    name:'send-transfer:sendtransferqueue',
    description:'send-transfer:sendtransferqueue',
    outputExample: {},
    middleware: ['logged-in-session'],
    inputs:{
        orderInfo: {required: true},

    },
    run: function (api, data, next) {
        api.services.sendToRabbitMq.sendTransferQueue(api, data.params).then(function () {
            next();
        }).catch(next);
    }
};

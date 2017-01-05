exports.default = {
    rabbitmq: function (api) {
        return {
            "url": "amqp://admin:123456@10.10.9.98",
            socketOptions: {

            },
            "exchange": "leng56-web",
            "queue": "leng56-web-queue"
        };
    }
};

exports.test = {
    rabbitmq: function (api) {
        return {
            "url": "amqp://localhost",
            socketOptions: {

            },
            "exchange": "leng56-web",
            "queue": "leng56-web-queue"
        };
    }
};

exports.development = exports.default.rabbitmq();

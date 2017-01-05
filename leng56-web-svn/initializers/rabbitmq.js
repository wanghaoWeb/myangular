var amqp = require('amqplib');
var path  = require('path');
var fs  = require('fs');

module.exports = {
    initialize: function(api, next){

        // 连接到rabbitMQ
        api.rabbitmq = {
            handlers: {},
            handlerLoad: function (callback) {
                try {
                    var dir = path.normalize(api.projectRoot + '/handlers');
                    fs.readdirSync(dir).forEach(function(file){
                        if (path.extname(file).toLowerCase() === '.js') {
                            var nameParts = file.split("/");
                            var name = nameParts[(nameParts.length - 1)].split(".")[0];
                            var handler = require(dir + '/' + name);
                            if (!handler.messageType) {
                                callback(new Error('unknown message type'));
                                return;
                            }

                            var handlers = api.rabbitmq.handlers[handler.messageType];
                            if (!handlers) {
                                handlers = [];
                                api.rabbitmq.handlers[handler.messageType] = handlers;
                            }
                            handlers.push(handler);

                            api.log('load rabbitMQ handler: ' + name, 'debug');
                        }
                    });
                    callback();
                } catch (err) {
                    callback(err);

                }
            },
            connection: function (api) {
                return amqp.connect(api.config.rabbitmq.url, api.config.rabbitmq.socketOptions).then(function(conn) {
                    process.once('SIGINT', function() { conn.close(); });

                    return conn.createChannel().then(function(ch) {
                        var ex = api.config.rabbitmq.exchange;
                        var ok = ch.assertExchange(ex, 'topic', {durable: true});

                        ok.then(function() {
                            return ch.assertQueue(api.config.rabbitmq.queue, {durable: true});
                        }).then(function (qok) {
                            var queue = qok.queue;
                            for (var handlerName in api.rabbitmq.handlers) {
                                ch.bindQueue(queue, ex, handlerName + ".#");
                            }

                        }).then(function(queue) {
                            return ch.consume(queue, messageHandle, {noAck: false});
                        });

                        function messageHandle(message) {
                            api.log(message.fields.routingKey + " : " + message.content.toString());

                            var content;
                            try {
                                content = JSON.parse(message.content);
                            } catch (err) {
                                api.log('the message content isn\'t json, error: ' + err.toString());
                                ch.ack(message);
                            }

                            if (content) {
                                var handlers = api.rabbitmq.handlers[content.messageType];

                                if (handlers) {
                                    for (var i = 0; i < handlers.length; i++) {
                                        handlers[i].handle(api, message.content);
                                    }
                                } else {
                                    api.log('ignore to handle the message('+message.content+'), message type is ' + content.messageType, 'warn');
                                }

                                ch.ack(message);
                            }

                        }

                        return ch;
                    })
                });
            },
            publish: function (api, message, callback) {
                if (!message) {
                    if (callback)
                        callback(new Error("message is undefined"));

                    return;
                }

                if (!message.messageType) {
                    if (callback)
                        callback(new Error("message type is undefined"));

                    return;
                }

                var options = {
                    persistent: true
                };

                api.rabbitmq.channel.publish(
                    api.config.rabbitmq.exchange,
                    message.messageType + '.' + message.targetId,
                    new Buffer(JSON.stringify(message)), options, publishCallback);

                function publishCallback(result) {
                    if (callback)
                        callback(null, result);
                }
            }
        };

        next();
    },

    start: function(api, next){
        api.rabbitmq.handlerLoad(function (err) {
            if (err)
                next(err);
        });

        api.rabbitmq.channel = api.rabbitmq.connection(api);

        next();
    },

    stop: function(api, next){
        next();
    }
};


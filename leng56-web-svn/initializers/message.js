module.exports = {
    initialize: function(api, next){
        var chatMiddleware = {
            name: 'chat-middleware',
                priority: 1000,
                join: function(connection, room, callback){
                // announce all connections entering a room
                api.log(connection.id + ' join ' + room, 'info');
                //api.chatRoom.broadcast({}, room, 'I have joined the room: ' + connection.id, callback);
                callback();
            },
            leave: function(connection, room, callback){
                // announce all connections leaving a room
                api.log(connection.id + ' leave ' + room, 'info');
                //api.chatRoom.broadcast({}, room, 'I have left the room: ' + connection.id, callback);
                callback();
            },
            /**
             * Will be executed once per client connection before delivering the message.
             */
            say: function(connection, room, messagePayload, callback){
                api.log(connection.id + ' say:' + messagePayload.message, 'info');
                try {
                    var msg = JSON.parse(messagePayload.message);
                    if (msg.messageType === 'SYSTEM') {
                        callback(null, messagePayload);
                    } else {
                        api.session.load(connection, function (error, sessionData) {
                            if (error) {
                                callback(error);
                            } else if (!sessionData) {
                                callback(new Error(api.services.Constants.ERROR_CODE.NO_LOGIN_IN));
                            } else {
                                if (msg.messageType === 'USER' && msg.target.id === sessionData.userId) {
                                    callback(null, messagePayload);
                                } else if (msg.messageType === 'ORGANIZATION' && msg.target.id === sessionData.organizationId) {
                                    callback(null, messagePayload);
                                } else {
                                    callback(new Error("无用消息"));
                                }
                            }
                        });
                    }
                } catch (err) {
                    api.log(err, 'info');
                }
            },
            /**
             * Will be executed only once, when the message is sent to the server.
             */
            onSayReceive: function(connection, room, messagePayload, callback){
                api.log(connection.id + ' onSayReceive ' + messagePayload.message, 'info');
                try {
                    var msg = JSON.parse(messagePayload.message);
                    if (!msg.id) {
                        if (!msg.creatorId && msg.creator)
                            msg.creatorId = msg.creator.id;
                        if (!msg.targetId && msg.target)
                            msg.targetId = msg.target.id;

                        msg.sentAt = new Date(messagePayload.sentAt);

                        var message = api.models.Message.build(msg);
                        message.save().then(function (result) {
                            msg.id = result.id;
                            messagePayload.message = JSON.stringify(msg);
                            callback(null, messagePayload);
                        });
                    }
                } catch (err) {
                    api.log('例外消息:' + messagePayload.message, 'info');
                }
            }
        };

        api.chatRoom.addMiddleware(chatMiddleware);

        next();
    },

    start: function(api, next){
        next();
    },

    stop: function(api, next){
        next();
    }
};


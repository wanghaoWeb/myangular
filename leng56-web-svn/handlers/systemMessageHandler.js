module.exports = {

    messageType: 'SYSTEM',

    handle: function (api, message, next) {
        api.chatRoom.broadcast({}, 'chat', message);
    }
};

module.exports = {

    messageType: 'USER',

    handle: function (api, message, next) {
        api.chatRoom.broadcast({}, 'chat', message);
    }
};

module.exports = {

    messageType: 'ORGANIZATION',

    handle: function (api, message, next) {
        api.chatRoom.broadcast({}, 'chat', message);
    }
};

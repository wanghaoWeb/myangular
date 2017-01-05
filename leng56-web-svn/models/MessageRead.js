
module.exports = function(sequelize,DataTypes){
    var Message = sequelize.define("messageRead",{
        'id':{
            type:DataTypes.UUID,
            field:'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
            comment: 'id'
        },
        'userId': {
            type:DataTypes.UUID,
            allowNull: false,
            field:'user_id',
            comment: '用户id'
        },
        'messageId': {
            type:DataTypes.UUID,
            allowNull: false,
            field:'message_id',
            comment: '消息id'
        },
        'status': {
            type:DataTypes.STRING,
            allowNull: false,
            field:'status',
            defaultValue: 'READ',
            comment: '消息已读状态,默认为已读'
        }

    },{
        tableName:'message_read',
        comment: '已读消息表',
        classMethods: {
            associate: function(models) {
                Message.belongsTo(models.User, {
                    as: 'user'
                });

                Message.belongsTo(models.Message, {
                    as: 'message'
                });
            },
            STATUS: {
                'UNREAD': {
                    code: 'UNREAD',
                    title: '未读',
                    desc: '未读'
                },
                'READ': {
                    code: 'READ',
                    title: '已读',
                    desc: '已读'
                }
            }
        },

        instanceMethods: {

        }
    });

    return Message;
};

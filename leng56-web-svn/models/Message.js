
module.exports = function(sequelize,DataTypes){
    var Message = sequelize.define("message",{
        'id':{
            type:DataTypes.UUID,
            field:'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true,
            comment: '消息id'
        },
        'messageType':{
            type:DataTypes.STRING,
            allowNull: false,
            field:'message_type',
            comment: '消息类型'
        },
        'creatorId': {
            type:DataTypes.UUID,
            allowNull: false,
            field:'creator_id',
            comment: '消息者id'
        },
        'targetId': {
            type:DataTypes.STRING,
            allowNull: true,
            field:'target_id',
            comment: '消息目标ID,与消息类型相关'
        },
        'title': {
            type:DataTypes.STRING,
            allowNull: true,
            field:'title'
        },
        'content': {
            type:DataTypes.TEXT,
            allowNull: false,
            field:'content'
        },
        'autoShow':{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field:'auto_show'
        },
        'sentAt': {
            type:DataTypes.DATE,
            allowNull: true,
            field:'sentAt'
        }
    },{
        tableName:'message',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function(models) {
                Message.belongsTo(models.User, {
                    as: 'creator'
                });
            },
            MESSAGE_TYPE: {
                'SYSTEM': {
                    code: 'SYSTEM',
                    title: '系统',
                    desc: '系统的所有用户'
                },
                'ORGANIZATION': {
                    code: 'ORGANIZATION',
                    title: '业务中心',
                    desc: '业务中心的所有用户'
                },
                'USER': {
                    code: 'USER',
                    title: '用户',
                    desc: '指定用户'
                }
            }
        },

        instanceMethods: {

        }
    });

    return Message;
};

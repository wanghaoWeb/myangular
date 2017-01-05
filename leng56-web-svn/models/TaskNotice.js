module.exports = function (sequelize, DataTypes) {
    var TaskNotice = sequelize.define("taskeNotice", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            field: 'id',
            primaryKey: true,
            comment: 'ID'
        },
        taskId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_id'
        },
        messageType: {
            type: DataTypes.STRING(30),
            field: 'message_type'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'content'
        }
    }, {
        tableName: 'task_notice',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                TaskNotice.belongsTo(models.Task, {as: 'task'});
            }
        },
        instanceMethods: {}
    });

    return TaskNotice;
};


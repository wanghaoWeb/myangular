module.exports = function (sequelize, DataTypes) {
    var TaskPayment = sequelize.define("taskPayment", {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        taskId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_id',
            comment: '货单id'
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            field: 'amount',
            comment: '付款金额,单位元'
        },
        paymentTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'pay_time',
            comment: '付款时间'
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'reason',
            comment: '付款理由'
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'reason',
            comment: '备注'
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'reason',
            defaultValue: 'UNCONFIRMED',
            comment: '状态{UNCONFIRMED:正在确认,CONFIRMED:已确认,NOT_RECEIVED:未收到}'
        },
        creatorId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'creator_id',
            comment: '创建人ID'
        }
    }, {
        tableName: 'task_payment',
        comment: '货单付款表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                TaskPayment.belongsTo(models.Task, {as: 'task'});

                TaskPayment.belongsTo(models.User, {as: 'creator'});
            }
        },
        instanceMethods: {}
    });

    return TaskPayment;
};

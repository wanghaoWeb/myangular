module.exports = function (sequelize, DataTypes) {
    var TaskBilling = sequelize.define("taskBilling", {
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
            comment: '货单Id'
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            field: 'amount',
            allowNull: false,
            comment: '开票金额'
        },
        status: {
            type: DataTypes.INTEGER,
            field: 'status',
            comment: '{UNCHECKED：待审核，CHECK_PASS：已开票，CHECK_REJECT：拒绝开票}'
        },
        creatorId: {
            type: DataTypes.UUID,
            field: 'creator_id',
            comment: '创建人ID'
        }

    }, {
        tableName: 'task_billing',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                TaskBilling.belongsTo(models.Task, {as: 'task'});

                TaskBilling.belongsTo(models.User, {as: 'creator'});
            }
        },
        instanceMethods: {}
    });

    return TaskBilling;

};

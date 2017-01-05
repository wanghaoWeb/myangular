module.exports = function (sequelize, DataTypes) {
    var TaskDispatch = sequelize.define("taskDispatch", {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        taskId: {
            type: DataTypes.UUID,
            field: 'task_id',
            allowNull: false,
            comment: '货单ID'
        },
        offer: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: true,
            field: 'offer',
            comment: '定价时的报价'
        },
        type: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'type',
            defaultValue: 'BIDDING',
            comment: '{PRICING：定价，BIDDING：竞价}'
        },
        creatorId: {
            type: DataTypes.UUID,
            field: 'creator_id',
            comment: '创建人ID'
        }

    }, {
        tableName: 'task_dispatch',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                TaskDispatch.belongsTo(models.Task, {as: 'task'});

                TaskDispatch.hasMany(models.TaskDispatchLoadingInfo, {as: 'taskDispatchLoadingInfo'});

                TaskDispatch.hasMany(models.TaskDispatchUnloadingInfo, {as: 'taskDispatchUnloadingInfo'});

                TaskDispatch.hasMany(models.TaskDispatchOffer, {as: 'taskDispatchOffers'});

                TaskDispatch.belongsTo(models.User, {as: 'creator'});
            }
        },
        instanceMethods: {}
    });

    return TaskDispatch;
};


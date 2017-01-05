module.exports = function (sequelize, DataTypes) {
    var TaskDispatchOffer = sequelize.define("taskDispatchOffer",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        taskDispatchId:{
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_dispatch_id'
        },
        vehicleId:{
            type: DataTypes.UUID,
            allowNull: false,
            field: 'vehicle_id',
            comment: '车辆id'
        },
        offer:{
            type: DataTypes.DECIMAL(11, 2),
            field: 'offer',
            allowNull: true,
            comment: '运价报价'
        },
        status:{
            type: DataTypes.STRING(30),
            field: 'status',
            defaultValue: 'NO_OFFER',
            comment: '{NO_OFFER：未报价，OFFERED：已报价, SELECTED: 成交,ACCEPTED:已接受}'
        },
        creatorId: {
            type: DataTypes.UUID,
            field: 'creator_id',
            comment: '创建人ID'
        }
    },{
        tableName:'task_dispatch_offer',
        comment: '货单运输车辆报价表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                TaskDispatchOffer.belongsTo(models.TaskDispatch, {as: 'taskDispatch'});

                TaskDispatchOffer.belongsTo(models.User, {as: 'creator'});

                TaskDispatchOffer.belongsTo(models.Vehicle, {as:'vehicle'})
            }
        },
        instanceMethods: {}
    });

    return TaskDispatchOffer;
};

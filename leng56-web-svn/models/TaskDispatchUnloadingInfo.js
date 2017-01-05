module.exports = function (sequelize, DataTypes) {
    var TaskDispatchUnloadingInfo = sequelize.define("taskDispatchUnloadingInfo",{
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
            field: 'task_dispatch_id',
            comment: '货单id'
        },
        taskUnloadingInfoId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_unloading_info_id',
            comment: '货单卸货id'
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'amount',
            comment: '卸货量'
        },
        amountUnit:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amount_unit',
            comment: '卸货单位'
        }
    },{
        tableName:'task_dispatch_unloading_info',
        comment: '货单派车卸货表',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                TaskDispatchUnloadingInfo.belongsTo(models.TaskDispatch, {as: 'taskDispatch'});

                TaskDispatchUnloadingInfo.belongsTo(models.TaskUnloadingInfo, {as: 'taskUnloadingInfo'});
            }
        },
        instanceMethods: {}
    });

    return TaskDispatchUnloadingInfo;
};

module.exports = function (sequelize, DataTypes) {
    var TaskDispatchLoadingInfo = sequelize.define("taskDispatchLoadingInfo",{
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
        taskLoadingInfoId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_loading_info_id',
            comment: '货单装载id'
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'amount',
            comment: '装货量'
        },
        amountUnit:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amount_unit',
            comment: '装货单位'
        }
    },{
        tableName:'task_dispatch_loading_info',
        comment: '货单派车装货表',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                TaskDispatchLoadingInfo.belongsTo(models.TaskDispatch, {as: 'taskDispatch'});

                TaskDispatchLoadingInfo.belongsTo(models.TaskLoadingInfo, {as: 'taskLoadingInfo'});
            }
        },
        instanceMethods: {}
    });

    return TaskDispatchLoadingInfo;
};

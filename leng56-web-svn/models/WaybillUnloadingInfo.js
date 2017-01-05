module.exports = function (sequelize, DataTypes) {
    var WaybillUnloadingInfo = sequelize.define("waybillUnloadingInfo",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        waybillId:{
            type: DataTypes.UUID,
            allowNull: false,
            field: 'waybill_id',
            comment: '运单id'
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
            comment: '装货量'
        },
        amountUnit:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amount_unit',
            comment: '装货单位'
        }
    },{
        tableName:'waybill_unloading_info',
        comment: '运单卸货列表',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                WaybillUnloadingInfo.belongsTo(models.Waybill, {as: 'waybill'});

                WaybillUnloadingInfo.belongsTo(models.TaskUnloadingInfo, {as: 'taskUnloadingInfo'});
            }
        },
        instanceMethods: {}
    });

    return WaybillUnloadingInfo;
};

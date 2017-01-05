module.exports = function (sequelize, DataTypes) {
    var WaybillLoadingInfo = sequelize.define("waybillLoadingInfo",{
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
        tableName:'waybill_loading_info',
        comment: '运单装货列表',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                WaybillLoadingInfo.belongsTo(models.Waybill, {as: 'waybill'});

                WaybillLoadingInfo.belongsTo(models.TaskLoadingInfo, {as: 'taskLoadingInfo'});
            }
        },
        instanceMethods: {}
    });

    return WaybillLoadingInfo;
};

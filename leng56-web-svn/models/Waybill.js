
module.exports = function (sequelize, DataTypes) {
    var Waybill = sequelize.define("waybill",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        code: {
            type: DataTypes.STRING(30),
            field: 'code',
            //allowNull: false,
            comment: '运单编号'
        },
        taskId:{
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_id',
            comment: '货单id'
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
            allowNull: false,
            comment: '运价'
        },
        status:{
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'status',
            defaultValue: 'NEW',
            comment: '运单状态{NEW:新运单;INVALID:已失效,TASK_OWNER_TERMINATED:货主已终止,VEHICLE_OWNER_TERMINATED:车主已终止，VEHICLE_OWNER_RECEIVED:车主已接单等待支付预付款,DRIVER_RECEIVED:司机已经接单,PREPAYMENT_PAID:已支付预付款等待装货,LOADED:已装货未送达,SERVED:已送达未上传回单,UPLOADED_ACK_IMG:已上传回单等待确认收货,CONFIRMED_RECEIPT:已确认收货,COMPLETED:已完成}'
        }
    },{
        tableName:'waybill',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                Waybill.belongsTo(models.Vehicle, {as: 'vehicle'});
                Waybill.belongsTo(models.Task, {as: 'task'});
                Waybill.hasMany(models.WaybillLoadingInfo, {as: 'loadingInfos'});
                Waybill.hasMany(models.WaybillUnloadingInfo, {as: 'unloadingInfos'});
                Waybill.hasMany(models.WaybillPayment, {as: 'payments'});
                Waybill.hasMany(models.WaybillCompensation, {as: 'compensations'});

            }
        },
        instanceMethods: {}
    });

    return Waybill;
};


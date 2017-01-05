module.exports = function (sequelize, DataTypes) {
    var WaybillPayment = sequelize.define("waybillPayment", {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        waybillId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'waybill_id',
            comment: '运单id'
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
            field: 'payment_time',
            comment: '付款时间'
        },
        paymentType: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'payment_type',
            comment: '付款类型,TRANSFER:转账、OFFLINE:线下、ETC:ETC、FUEL_CARD加油卡、FREIGHT_FACTORING:运费保理、LOAN: 贷款'
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
            field: 'remark',
            comment: '备注'
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'status',
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
        tableName: 'waybill_payment',
        comment: '运单付款表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillPayment.belongsTo(models.Waybill, {as: 'waybill'});

                WaybillPayment.belongsTo(models.User, {as: 'creator'});
            }
        },
        instanceMethods: {}
    });

    return WaybillPayment;
};

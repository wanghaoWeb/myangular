module.exports = function (sequelize, DataTypes) {
    var WaybillSettlementDetail = sequelize.define("waybillSettlementDetail", {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        waybillSettlementId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'waybill_settlement_id',
            comment: '运单结算id'
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            field: 'amount',
            comment: '付款金额,单位元'
        },
        paymentType: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'payment_type',
            comment: '付款类型,TRANSFER:转账、OFFLINE:线下、ETC:ETC、FUEL_CARD加油卡、FREIGHT_FACTORING:运费保理、LOAN: 贷款'
        }
    }, {
        tableName: 'waybill_settlement_detail',
        comment: '运单结算明细表',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                WaybillSettlementDetail.belongsTo(models.WaybillSettlement, {as: 'waybillSettlement'});
            }
        },
        instanceMethods: {}
    });

    return WaybillSettlementDetail;
};

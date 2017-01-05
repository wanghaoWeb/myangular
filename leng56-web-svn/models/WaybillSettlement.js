module.exports = function (sequelize, DataTypes) {
    var WaybillSettlement = sequelize.define("waybillSettlement",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            comment: 'ID'
        },
        waybillId:{
            type: DataTypes.UUID,
            allowNull: false,
            field: 'waybill_id',
            comment: '运单id'
        },
        amount:{
            type: DataTypes.DECIMAL(11, 2),
            field: 'amount',
            allowNull: false,
            comment: '结算金额'
        },
        compensationAmount:{
            type: DataTypes.DECIMAL(11, 2),
            field: 'compensation_amount',
            allowNull: false,
            defaultValue: 0,
            comment: '理赔金额'
        },
        prepaymentAmount:{
            type: DataTypes.DECIMAL(11, 2),
            field: 'prepayment_amount',
            allowNull: false,
            defaultValue: 0,
            comment: '预付款总金额'
        },
        status:{
            type: DataTypes.STRING(30),
            field: 'status',
            allowNull: false,
            defaultValue: 'UNCHECKED',
            comment: '状态{UNCHECKED:正在审核,CHECK_PASS:审核通过,CHECK_REJECT:审核拒绝}'
        },
        current:{
            type: DataTypes.INTEGER,
            field: 'current',
            allowNull: false,
            defaultValue: 1,
            comment: '是否是最近的一条申请记录{0:不是，1:是}'
        },
        creatorId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'creator_id',
            comment: '创建人ID'
        }
    },{
        tableName:'waybill_settlement',
        comment: '运单结算表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillSettlement.belongsTo(models.Waybill, {as: 'waybill'});

                WaybillSettlement.belongsTo(models.User, {as: 'creator'});

                WaybillSettlement.hasMany(models.WaybillSettlementDetail, {as: 'detail'});
            }
        },
        instanceMethods: {}
    });

    return WaybillSettlement;
};


module.exports = function (sequelize, DataTypes) {
    var WaybillCompensation = sequelize.define("waybillCompensation", {
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
            comment: '运单ID'
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            field: 'amount',
            comment: '理赔金额'
        },
        type: {
            type: DataTypes.INTEGER,
            field: 'type',
            comment: '赔偿方式{1:司机赔款,2:平台赔款}'
        },
        reason: {
            type: DataTypes.STRING,
            field: 'reason',
            comment: '原因'
        },
        status: {
            type: DataTypes.STRING(30),
            field: 'status',
            defaultValue: 'UNCHECKED',
            comment: '状态{UNCHECKED:正在审核,CHECK_PASS:审核通过,CHECK_REJECT:审核拒绝}'
        },
        current: {
            type: DataTypes.INTEGER,
            field: 'current',
            defaultValue: 1,
            comment: '是否是最近的一条申请记录{0:不是，1:是}'
        },
        'creatorId': {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'creator_id',
            comment: '创建人ID'
        },
        remark: {
            type: DataTypes.STRING,
            field: 'remark'
        }
    }, {
        tableName: 'waybill_compensation',
        comment: '运单理赔表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillCompensation.belongsTo(models.Waybill, {as: 'waybill'});
            }
        },
        instanceMethods: {}
    });

    return WaybillCompensation;
};

module.exports = function (sequelize, DataTypes) {
    var WaybillTermination = sequelize.define("waybillTermination",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            comment: 'ID'
        },
        waybillId:{
            type: DataTypes.UUID,
            field: 'waybill_id',
            comment: '运单id'
        },
        amount:{
            type: DataTypes.DECIMAL,
            field: 'amount',
            comment: '金额'
        },
        type:{
            type: DataTypes.INTEGER,
            field: 'type',
            comment: '赔偿方式{1:司机赔款,2:平台赔款}'
        },
        reason:{
            type: DataTypes.STRING,
            field: 'reason',
            comment: '终止原因'
        },
        status:{
            type: DataTypes.STRING(30),
            field: 'status',
            defaultValue: 'UNCHECKED',
            comment: '状态{UNCHECKED:正在审核,CHECK_PASS:通过,CHECK_REJECT:拒绝}'
        },
        current:{
            type: DataTypes.INTEGER,
            field: 'current',
            defaultValue: 1,
            comment: '是否是最近的一条申请记录{0:不是，1:是}'
        },
        creatorId:{
            type: DataTypes.UUID,
            field: 'creator_id',
            comment: '创建人id'
        },
        createTime:{
            type: DataTypes.DATE,
            field: 'create_time',
            comment: '创建时间'
        },
        updateTime:{
            type: DataTypes.DATE,
            field: 'update_time',
            comment: '修改时间'
        },
        uitype:{
            type: DataTypes.INTEGER,
            field: 'uitype',
            comment: ''
        },
        remark:{
            type: DataTypes.STRING,
            field: 'remark',
            comment: '备注'
        }
    },{
        tableName:'waybill_termination',
        comment: '运单终止表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillTermination.belongsTo(models.Waybill, {as: 'waybill'});

                WaybillTermination.belongsTo(models.User, {as: 'creator'});
            }
        },
        instanceMethods: {}
    });


    return WaybillTermination;
};


module.exports = function (sequelize, DataTypes) {
    var WaybillAckImg = sequelize.define("WaybillAckImg", {
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
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'img',
            comment: '回单图片URL'
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'remark',
            comment: '备注'
        }
    }, {
        tableName: 'waybill_ack_img',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillAckImg.belongsTo(models.Waybill, {as: 'waybill'});
            }
        },
        instanceMethods: {}
    });

    return WaybillAckImg;
};

module.exports = function (sequelize, DataTypes) {
    var WaybillNotice = sequelize.define("waybillNotice", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            field: 'id',
            primaryKey: true,
            comment: 'ID'
        },
        waybillId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'waybill_id'
        },
        messageType: {
            type: DataTypes.STRING(30),
            field: 'message_type'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'content'
        }
    }, {
        tableName: 'waybill_notice',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillNotice.belongsTo(models.Waybill, {as: 'waybill'});
            }
        },
        instanceMethods: {}
    });

    return WaybillNotice;
};


module.exports = function (sequelize, DataTypes) {
    var WaybillEvent = sequelize.define("WaybillEvent", {
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
        event: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'event',
            comment: '事件'
        },
        'creatorId': {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'creator_id',
            comment: '创建人ID'
        }
    }, {
        tableName: 'waybill_event',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                WaybillEvent.belongsTo(models.Waybill, {as: 'waybill'});
            }
        },
        instanceMethods: {}
    });

    return WaybillEvent;
};

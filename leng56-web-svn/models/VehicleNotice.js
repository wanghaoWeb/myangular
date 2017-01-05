module.exports = function (sequelize, DataTypes) {
    var VehicleNotice = sequelize.define("vehicleNotice", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            field: 'id',
            primaryKey: true,
            comment: 'ID'
        },
        vehicleId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'vehicle_id'
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
        tableName: 'vehicle_notice',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                VehicleNotice.belongsTo(models.Vehicle, {as: 'vehicle'});
            }
        },
        instanceMethods: {}
    });

    return VehicleNotice;
};


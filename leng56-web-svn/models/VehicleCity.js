module.exports = function (sequelize, DataTypes) {
    var VehicleCity = sequelize.define("vehicleCity", {
        vehicleId: {
            type: DataTypes.UUID,
            field: 'vehicle_id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            comment: '车辆ID'
        },
        cityId: {
            type: DataTypes.INTEGER,
            field: 'city_id',
            primaryKey: true,
            comment: '城市ID'
        }
    }, {
        tableName: 'vehicle_city',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                VehicleCity.belongsTo(models.Vehicle, {as: 'vehicle'});
                VehicleCity.belongsTo(models.City, {as: 'city'});
            }
        },
        instanceMethods: {

        }
    });

    return VehicleCity;
};

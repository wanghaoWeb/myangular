module.exports = function (sequelize, DataTypes) {
    var City = sequelize.define("city", {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true
        }, name: {
            type: DataTypes.STRING,
            field: 'name'
        }, lng: {
            type: DataTypes.FLOAT,
            field: 'lng'
        }, lat: {
            type: DataTypes.FLOAT,
            field: 'lat'
        }, provinceId: {
            type: DataTypes.INTEGER,
            field: 'province_id'
        }, createTime: {
            type: DataTypes.DATE,
            field: 'create_time'
        }, updateTime: {
            type: DataTypes.DATE,
            field: 'update_time'
        }
    }, {
        tableName: 'city',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                City.belongsTo(models.Province, {as: 'province'});
            }
        },
    });

    return City;
};


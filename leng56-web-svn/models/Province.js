module.exports = function (sequelize, DataTypes) {
    var Province = sequelize.define("province", {
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
        }, createTime: {
            type: DataTypes.DATE,
            field: 'create_time'
        }, updateTime: {
            type: DataTypes.DATE,
            field: 'update_time'
        }
    }, {
        tableName: 'province',
        timestamps: false,
    });

    return Province;
}
